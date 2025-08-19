import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import fs from 'fs'

import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import houseRoute from './routes/houseRoute.js'
import roomTypeRoute from './routes/roomTypeRoute.js'
import roomRoute from './routes/roomRoute.js'
import uploadRoute from './routes/uploadRoute.js'
import bookingRoute from './routes/bookingRoute.js'

dotenv.config();
const app = express();

app.use(cors());    // Cho phép frontend truy cập
app.use(express.json());    // Cho phép gửi request application/json
app.use('/uploads', express.static('uploads')); // Phục vụ tệp tĩnh từ thư mục uploads
// Tạo thư mục uploads nếu chưa tồn tại
const dir = './uploads';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

connectDB();

// Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/house", houseRoute);
app.use("/room-type", roomTypeRoute);
app.use("/room", roomRoute);
app.use("/upload", uploadRoute);
app.use('/booking', bookingRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));