import { registerUser, loginUser, currentUser} from '../controllers/authController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";
import express from 'express';
const router = express.Router();

//REGISTER
router.post("/register", registerUser);

//LOG IN
router.post("/login", loginUser);

router.get("/me", authenticateToken, currentUser);

export default router