import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Liên kết với collection Users
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room', // Liên kết với collection Rooms
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0, // Giá không được âm
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'], // Chỉ cho phép các giá trị này
      default: 'pending',
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

// Đảm bảo checkOut lớn hơn checkIn
bookingSchema.pre('save', function (next) {
  if (this.checkOut <= this.checkIn) {
    return next(new Error('Check-out date must be after check-in date'));
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;