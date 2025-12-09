import express from "express";
import {
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    changeAvailability,
    updateAppointmentStatus,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);

// ✅ Authenticated routes
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/change-availability", authDoctor, changeAvailability);
doctorRouter.post("/update-appointment-status", authDoctor, updateAppointmentStatus);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);

// ✅ Fixed from GET → POST (to match frontend)
doctorRouter.post("/profile", authDoctor, doctorProfile);

// ✅ Update profile route
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
