import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Protected route (requires authentication)
userRouter.get('/get-profile', authUser, getProfile);

export default userRouter;
