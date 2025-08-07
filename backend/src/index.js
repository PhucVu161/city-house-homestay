import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/auth", authRoute);
// app.use('/api/rooms', require('./routes/rooms'));
// app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));