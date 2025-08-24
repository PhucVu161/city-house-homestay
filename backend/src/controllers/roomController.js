import Room from "../models/Room.js";
import Booking from "../models/Booking.js";

// Lấy danh sách tất cả phòng (có populate House và RoomType)
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ deletedAt: null })
      .populate("house")
      .populate("roomType");
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy chi tiết phòng theo ID
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findOne({ _id: req.params.id, deletedAt: null })
      .populate("house")
      .populate("roomType");
    if (!room) return res.status(404).json({ error: "Không tìm thấy phòng" });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo phòng mới
export const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    const populatedRoom = await Room.findById(savedRoom._id)
      .populate("house")
      .populate("roomType");
    res.status(201).json(populatedRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật phòng
export const updateRoom = async (req, res) => {
  try {
    const updated = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("house")
      .populate("roomType");
    if (!updated)
      return res
        .status(404)
        .json({ error: "Không tìm thấy phòng để cập nhật" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa phòng
export const deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deleted)
      return res.status(404).json({ error: "Không tìm thấy phòng để xóa" });
    res.status(200).json({ message: "Đã xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tìm kiếm phòng theo checkIn và checkOut
export const searchRooms = async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;

    //kiểm tra có dữ liệu trong checkin checkout không
    if (!checkIn || !checkOut) {
      return res.status(400).json({ message: "Missing checkIn or checkOut" });
    }

    //chuyển từ chuỗi ISO 8601 về kiểu Date
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const now = new Date();

    //kiểm tra checkIn và checkOut có hợp lệ không
    if (start <= now) {
      return res.status(400).json({ message: "checkIn must be in the future" });
    }
    if (start >= end) {
      return res
        .status(400)
        .json({ message: "checkOut must be after checkIn" });
    }

    // Tìm các booking bị giao nhau với khoảng thời gian yêu cầu
    const bookedRooms = await Booking.find({
      $or: [{ checkIn: { $lt: end }, checkOut: { $gt: start } }],
    }).distinct("roomId"); //để roomId là kết quả duy nhất

    // Trả về các phòng không nằm trong danh sách đã bị đặt
    const availableRooms = await Room.find({
      _id: { $nin: bookedRooms }, // lấy các phòng mà _id không thuộc bookedRooms
      deletedAt: null, // chỉ lấy phòng chưa bị xóa
    })
      .populate("house")
      .populate("roomType");

    res.status(200).json(availableRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kiểm tra phòng có khả dụng với checkIn, checkOut người dùng chọn không
export const checkRoomAvailability = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.query;
    if (!roomId || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Missing parameters" });
    }
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    //tìm các booking của roomId giao với checkIn checkOut
    const overlappingBooking = await Booking.findOne({
      roomId,
      status: { $ne: "cancelled" },
      checkIn: { $lt: end },
      checkOut: { $gt: start },
    });
    const isAvailable = !overlappingBooking;

    res.status(200).json({ available: isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};