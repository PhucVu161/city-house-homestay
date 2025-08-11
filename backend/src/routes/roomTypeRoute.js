import {
  createRoomType,
  getAllRoomTypes,
  getRoomTypeById,
  updateRoomType,
  deleteRoomType
} from "../controllers/roomTypeController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/", authenticateToken, authorizeAdmin, createRoomType);
router.get("/", authenticateToken, authorizeAdmin, getAllRoomTypes);
router.get("/:id", authenticateToken, authorizeAdmin, getRoomTypeById);
router.put("/:id", authenticateToken, authorizeAdmin, updateRoomType);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteRoomType);

export default router;