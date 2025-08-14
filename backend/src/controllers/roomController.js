import Room from "../models/Room.js";

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
    res.status(400).json({ error: err.message });
  }
};

// Lấy danh sách tất cả phòng (có populate House và RoomType)
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ deletedAt: null })
      .populate("house")
      .populate("roomType");
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật phòng
export const updateRoom = async (req, res) => {
  try {
    const updated = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
  .populate("house")
  .populate("roomType");
    if (!updated) return res.status(404).json({ error: "Không tìm thấy phòng để cập nhật" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    if (!deleted) return res.status(404).json({ error: "Không tìm thấy phòng để xóa" });
    res.status(200).json({ message: "Đã xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};