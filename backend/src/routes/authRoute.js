import { registerUser, loginUser } from '../controllers/authController.js';
import express from 'express';
const router = express.Router();

//REGISTER
router.post("/register", registerUser);

//LOG IN
router.post("/login", loginUser);

export default router