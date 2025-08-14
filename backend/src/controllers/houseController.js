import House from "../models/House.js";

// Tạo nhà mới
export const createHouse = async (req, res) => {
  try {
    const newHouse = new House(req.body);
    const savedHouse = await newHouse.save();
    res.status(201).json(savedHouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy danh sách tất cả nhà
export const getAllHouses = async (req, res) => {
  try {
    const houses = await House.find({ deletedAt: null })
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy chi tiết một nhà theo ID
export const getHouseById = async (req, res) => {
  try {
    const house = await House.findOne({ _id: req.params.id, deletedAt: null });
    if (!house) return res.status(404).json({ error: "Không tìm thấy nhà" });
    res.status(200).json(house);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa nhà
export const deleteHouse = async (req, res) => {
  try {
    const deleted = await House.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ error: "Không tìm thấy nhà để xóa" });
    res.status(200).json({ message: "Đã xóa thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật thông tin nhà
export const updateHouse = async (req, res) => {
  try {
    const updated = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: "Không tìm thấy nhà để cập nhật" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};