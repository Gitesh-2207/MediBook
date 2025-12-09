import express from 'express';
import { registerUser, loginUser, getProfile,updateProfile } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Protected route (requires authentication)
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)

export default userRouter;
