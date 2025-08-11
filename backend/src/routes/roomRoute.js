import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} from "../controllers/roomController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/", authenticateToken, authorizeAdmin, createRoom);
router.get("/", authenticateToken, authorizeAdmin, getAllRooms);
router.get("/:id", authenticateToken, authorizeAdmin, getRoomById);
router.put("/:id", authenticateToken, authorizeAdmin, updateRoom);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteRoom);

export default router;
