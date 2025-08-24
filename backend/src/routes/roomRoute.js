import {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  searchRooms,
  checkRoomAvailability
} from "../controllers/roomController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

//api dành cho người dùng
router.get('/search', searchRooms);//Tìm các phòng trống
router.get("/check", checkRoomAvailability);//kiểm tra phòng trống hay không
router.get("/", getAllRooms);//lấy danh sách phòng
router.get("/:id", getRoomById);//lấy thông tin phòng theo id

//api để admin quản lý phòng
router.post("/", authenticateToken, authorizeAdmin, createRoom);//tạo phòng mới
router.put("/:id", authenticateToken, authorizeAdmin, updateRoom);//sửa phòng theo id
router.delete("/:id", authenticateToken, authorizeAdmin, deleteRoom);//xóa phòng theo id

export default router;
