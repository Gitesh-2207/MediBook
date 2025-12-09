import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// ✅ Toggle doctor's availability (works for both admin & doctor)
const changeAvailability = async (req, res) => {
  try {
    // Admin sends docId; Doctor uses token (req.doctorId)
    const doctorId = req.body.docId || req.doctorId;

    if (!doctorId)
      return res.status(400).json({ success: false, message: "Doctor ID missing" });

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor)
      return res.status(404).json({ success: false, message: "Doctor not found" });

    doctor.available = !doctor.available;
    await doctor.save();

    res.json({
      success: true,
      message: `Doctor availability changed to ${doctor.available ? "Available" : "Unavailable"}`,
      available: doctor.available,
    });
  } catch (error) {
    console.error("Change Availability Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all doctors
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor)
      return res.json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get appointments for doctor
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.doctorId;
    const appointments = await appointmentModel
      .find({ docId })
      .sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const doctorId = req.doctorId;

    const appointment = await appointmentModel.findOne({
      _id: appointmentId,
      docId: doctorId,
    });
    if (!appointment)
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });

    if (status === "accept") {
      appointment.cancelled = false;
      appointment.isCompleted = false;
      appointment.payment = false;
    } else if (status === "reject") {
      appointment.cancelled = true;
    } else if (status === "complete") {
      appointment.isCompleted = true;
      appointment.payment = true;
    } else {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    await appointment.save();
    res.json({
      success: true,
      message: `Appointment ${status}ed successfully`,
      appointment,
    });
  } catch (error) {
    console.error("Update Appointment Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Doctor Dashboard
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.doctorId;
    const appointments = await appointmentModel
      .find({ docId })
      .sort({ createdAt: -1 });

    let earnings = 0;
    const uniquePatients = new Set();

    const latestAppointments = appointments.slice(0, 5).map((item) => {
      if (item.isCompleted && item.payment) earnings += item.amount || 0;
      if (item.userId) uniquePatients.add(item.userId);

      const formattedDate = item.slotDate
        ? new Date(item.slotDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        : "No Date";

      let status = "Pending";
      if (item.cancelled) status = "Rejected";
      else if (item.isCompleted) status = "Completed";

      return {
        _id: item._id,
        userName: item.userData?.name || "Unknown",
        date: formattedDate,
        status,
      };
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: uniquePatients.size,
      latestAppointments,
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error("Doctor Dashboard Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get doctor profile
const doctorProfile = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.doctorId).select("-password");

    if (!doctor)
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });

    res.json({ success: true, profileData: doctor });
  } catch (error) {
    console.error("Doctor Profile Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(req.doctorId, {
      fees,
      address,
      available,
    });
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  updateAppointmentStatus,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
