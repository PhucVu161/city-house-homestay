import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate access token
const generateAccessToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // Giảm thời gian hết hạn
  );
};

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });
    // Save user to DB
    const user = await newUser.save();
    // Generate access token
    const accessToken = generateAccessToken(user);
    // Remove password before sending response
    const { password, ...userWithoutPassword } = user._doc;
    res.status(201).json({ user: userWithoutPassword, token: accessToken }); // Dùng 201 cho tạo mới
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    res.status(500).json({ message: "Failed to register user" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Generate access token
    const accessToken = generateAccessToken(user);
    const { password, ...others } = user._doc;
    res.status(200).json({ user: others, token: accessToken });
  } catch (err) {
    res.status(500).json({ message: "Failed to login" });
  }
};