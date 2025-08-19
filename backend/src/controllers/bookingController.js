import Booking from "../models/Booking.js";
//import Room from '../models/Room.js'; // Nếu cần kiểm tra phòng tồn tại

// Người dùng tạo booking mới
export const createBooking = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut, bookingType, totalPrice } = req.body; // Lấy từ client
    const userId = req.user.id; // Lấy từ middleware xác thực

    // Kiểm tra dữ liệu đầu vào
    if (!roomId || !checkIn || !checkOut || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Kiểm tra checkIn phải nhỏ hơn checkOut và checkIn phải lớn hơn ngày hiện tại
    //...

    // (Tuỳ chọn) Kiểm tra phòng có tồn tại không
    // const room = await Room.findById(roomId);
    // if (!room) return res.status(404).json({ message: 'Room not found' });

    // (Tùy chọn) Kiểm tra lại totalPrice từ client có tính đúng hay không để tăng an toàn dữ liệu
    //...

    //Kiểm tra lại checkin checkout có bị trùng với booking nào k để tránh lỗi hệ thống
    const isRoomBooked = await Booking.findOne({
      //Tìm các booking chưa bị hủy trong khoảng thời gian tạo booking
      roomId,
      status: { $ne: "cancelled" },
      $or: [
        {
          checkIn: { $lt: checkOut },
          checkOut: { $gt: checkIn },
        },
      ],
    });
    if (isRoomBooked) {
      //Nếu đã có phòng trùng khoảng thời gian đó thì trả về lỗi
      return res
        .status(400)
        .json({ message: "Room is already booked during this time range" });
    }

    //Tạo booking
    const booking = new Booking({
      userId,
      roomId,
      checkIn,
      checkOut,
      bookingType,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy danh sách booking của người dùng đang đăng nhập
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId })
      .populate("roomId") // Lấy thông tin phòng
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Người dùng hủy booking nếu đang pending
export const cancelMyBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    // Tìm booking theo ID và user
    const booking = await Booking.findOne({ _id: bookingId, userId }); //có thêm userId để bảo mật tránh hủy booking của người khác

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending bookings can be cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin lấy danh sách booking
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("roomId") // Lấy thông tin phòng
      .populate("userId") // Lấy thông tin người đặt
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Admin lấy danh sách booking chưa hoàn thành
export const getActiveBookings = async (req, res) => {
  try {
    const now = new Date();

    const bookings = await Booking.find({ checkOut: { $gte: now } })
      .populate("roomId")
      .populate("userId")
      .sort({ checkIn: 1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Admin lấy danh sách booking đã hoàn thành
export const getCompletedBookings = async (req, res) => {
  try {
    const now = new Date();

    const bookings = await Booking.find({ checkOut: { $lt: now } })
      .populate("roomId")
      .populate("userId")
      .sort({ checkOut: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin hủy booking
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "The booking is cancelled" });
    }

    booking.status = "cancelled";
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking cancelled successfully by admin", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin xác nhận đặt phòng thành công
export const confirmBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending bookings can be confirmed" });
    }

    booking.status = "confirmed";
    await booking.save();

    res
      .status(200)
      .json({ message: "Booking confirmed successfully by admin", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
