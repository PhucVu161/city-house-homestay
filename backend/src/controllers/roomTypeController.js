import RoomType from "../models/RoomType.js"; // đường dẫn tùy theo bạn đặt

// Tạo loại phòng mới
export const createRoomType = async (req, res) => {
  try {
    const newRoomType = new RoomType(req.body);
    const savedRoomType = await newRoomType.save();
    res.status(201).json(savedRoomType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lấy danh sách tất cả loại phòng
export const getAllRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.status(200).json(roomTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy chi tiết loại phòng theo ID
export const getRoomTypeById = async (req, res) => {
  try {
    const roomType = await RoomType.findById(req.params.id);
    if (!roomType) return res.status(404).json({ error: "Không tìm thấy loại phòng" });
    res.status(200).json(roomType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật loại phòng
export const updateRoomType = async (req, res) => {
  try {
    const updated = await RoomType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: "Không tìm thấy loại phòng để cập nhật" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa loại phòng
export const deleteRoomType = async (req, res) => {
  try {
    const deleted = await RoomType.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Không tìm thấy loại phòng để xóa" });
    res.status(200).json({ message: "Đã xóa thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
