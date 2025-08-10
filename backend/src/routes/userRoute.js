import { currentUser, updateCurrentUser, changePassword } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import express from 'express';
const router = express.Router();

//CURRENT USER
router.get("/me", authenticateToken, currentUser);
router.put("/me", authenticateToken, updateCurrentUser);
router.put("/me/password", authenticateToken, changePassword);

export default router