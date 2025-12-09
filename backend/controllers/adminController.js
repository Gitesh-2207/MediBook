import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"
import appointmentModel from '../models/appointmentModel.js'
import userModel from "../models/userModel.js";

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    // Check required fields
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary if exists
    let imgUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      imgUrl = imageUpload.secure_url;
    } else {
      console.log("⚠️ No file received");
    }

    // Parse address safely
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch (err) {
      parsedAddress = { line1: address }; // fallback
    }

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      image: imgUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      date: Date.now(),
    };

    // Save to DB
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//api for adimn login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: error.message })
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}
//
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
//api to get all appointment list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({ success: true, appointments })
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}
//api to get dashboard data for admin pannel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})
    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }
    res.json({ success: true, dashData })
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, adminDashboard };
