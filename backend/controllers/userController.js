import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";

// -------------------- REGISTER USER --------------------
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      message: "Registration successful",
      token,
    });
  } catch (error) {
    console.log("Register user error:", error);
    res.json({ success: false, message: error.message });
  }
};

// -------------------- LOGIN USER --------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log("Login error:", error);
    res.json({ success: false, message: error.message });
  }
};

// -------------------- GET PROFILE --------------------
const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    res.json({ success: true, data: user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// -------------------- UPDATE PROFILE --------------------
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, gender, dob } = req.body;

    await userModel.findByIdAndUpdate(req.userId, {
      name,
      phone,
      address,
      gender,
      dob,
    });

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// -------------------- BOOK APPOINTMENT --------------------
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    if (!userId || !docId || !slotDate || !slotTime) {
      return res.json({ success: false, message: "Missing booking details" });
    }

    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked || {};
    if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    slots_booked[slotDate].push(slotTime);

    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cleanDocData = docData.toObject();
    delete cleanDocData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData: cleanDocData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
      payment: false,
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Book appointment error:", error);
    res.json({ success: false, message: error.message });
  }
};

// -------------------- LIST USER APPOINTMENTS --------------------
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error("List appointment error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// -------------------- CANCEL APPOINTMENT --------------------
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    if (doctorData) {
      let slots_booked = doctorData.slots_booked || {};
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(
          (t) => t !== slotTime
        );
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
      }
    }

    await appointmentModel.findByIdAndDelete(appointmentId);

    res.json({
      success: true,
      message: "Appointment cancelled and slot released",
    });
  } catch (error) {
    console.error("Cancel appointment error:", error);
    res.json({ success: false, message: error.message });
  }
};

// -------------------- CONFIRM PAYMENT (simple update) --------------------
const confirmPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    appointment.payment = true;
    await appointment.save();

    res.json({ success: true, message: "Payment updated successfully" });
  } catch (error) {
    console.error("Confirm payment error:", error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  confirmPayment,
};
