import express from 'express';
import { doctorList } from '../controllers/doctorController.js';

const doctorRouter = express.Router();   // ✅ call the function with ()

doctorRouter.get('/list', doctorList);

export default doctorRouter;
