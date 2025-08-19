import { createBooking, getMyBookings, cancelMyBooking, getBookings, getActiveBookings, getCompletedBookings, cancelBooking, confirmBooking } from '../controllers/bookingController.js';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware.js';
import express from 'express';
const router = express.Router();

//api với booking của current user
router.post('/', authenticateToken, createBooking);//tạo booking
router.get('/me', authenticateToken, getMyBookings);//lấy danh sách booking
router.patch('/me/:id', authenticateToken, cancelMyBooking);//hủy booking đang pending

//api với booking của admin
router.get('/', authenticateToken, authorizeAdmin, getBookings);//lấy danh sách booking
router.get('/active', authenticateToken, authorizeAdmin, getActiveBookings);//danh sách booking chưa hoàn thành
router.get('/completed', authenticateToken, authorizeAdmin, getCompletedBookings);//danh sách booking đã hoàn thành
router.patch('/cancel/:id', authenticateToken, authorizeAdmin, cancelBooking);//hủy booking đang pending
router.patch('/confirm/:id', authenticateToken, authorizeAdmin, confirmBooking);//hủy booking đang pending

export default router;