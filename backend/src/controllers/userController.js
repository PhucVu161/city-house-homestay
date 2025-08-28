import User from "../models/User.js";
import bcrypt from "bcrypt";

// CURRENT USER
export const currentUser = async (req, res) => {
  const currentUser = await User.findById(req.user.id).select("-password"); // bỏ password nếu có
  if (!currentUser) return res.status(404).json({ message: "User not found" });
  res.json(currentUser);
};

// UPDATE PROFILE CURRENT USER
export const updateCurrentUser = async (req, res) => {
  const { username, email, phone } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { username, email, phone },
    { new: true }
  ).select('-password');
  res.json(updatedUser);
};

// CHANGE PASSWORD OF CURRENT USER
export const changePassword = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Missing old or new password" });
  }

  const validPassword = await bcrypt.compare(oldPassword, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Incorrect old password" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
  res.json({ message: "Password updated successfully" });
};

//Get all users for admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};