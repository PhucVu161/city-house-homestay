import { currentUser, updateCurrentUser, changePassword, getAllUsers } from "../controllers/userController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import express from 'express';
const router = express.Router();

//CURRENT USER
router.get("/me", authenticateToken, currentUser);
router.put("/me", authenticateToken, updateCurrentUser);
router.put("/me/password", authenticateToken, changePassword);

//Admin manage
router.get("/all", authenticateToken, authorizeAdmin, getAllUsers);

export default router