import express from 'express';
import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    confirmPayment
} from '../controllers/userController.js';

import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

// Public
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Protected
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/confirm-payment', authUser, confirmPayment); // ✅ Added

export default userRouter;
