import express from 'express';
import { addDoctor, loginAdmin, allDoctors } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';

const adminrouter = express.Router();

// Routes
adminrouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminrouter.post('/login', loginAdmin);

// POST version for fetching all doctors
adminrouter.post('/all-doctors', authAdmin, allDoctors);

export default adminrouter;
