import express from 'express';
import {
    addDoctor,
    loginAdmin,
    allDoctors,
    appointmentsAdmin,
    adminDashboard,
} from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminrouter = express.Router();

// Routes
adminrouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminrouter.post('/login', loginAdmin);

// Fetch all doctors
adminrouter.post('/all-doctors', authAdmin, allDoctors);

// ✅ Fixed availability route
adminrouter.post('/change-availability', authAdmin, changeAvailability);

adminrouter.get('/appointments', authAdmin, appointmentsAdmin);
adminrouter.get('/dashboard', authAdmin, adminDashboard);

export default adminrouter;
