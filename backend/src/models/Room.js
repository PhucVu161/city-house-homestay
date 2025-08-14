import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    // Mã phòng, ví dụ: H401, H501
    roomCode: {
      type: String,
      required: true,
    },

    // Tòa nhà mà phòng đó thuộc về
    house: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "House", // tên model đã export
      required: true,
    },

    // Tên loại phòng
    roomType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType",
      required: true,
    },

    // Mô tả phòng
    description: {
      type: String,
      required: true,
      default:
        "Căn Homestay với gam màu gỗ linh tế và thiết kế tối giản, sang trọng với cửa sổ lớn nhiều ánh sáng tự nhiên. Được trang bị đầy đủ tiện nghi...",
    },

    // Các tiện nghi của phòng
    amenities: [
      {
        type: String,
        enum: [
          "Máy chiếu & Netflix",
          "Thang máy",
          "Bếp nấu",
          "Bồn tắm",
          "Tủ check-in",
          "Giặt sấy",
          "Ban công",
          "Điều hòa",
          "Máy lọc không khí",
        ],
        required: true,
      },
    ],

    // Ảnh của phòng (lưu đường dẫn)
    images: [
      {
        type: String,
      },
    ],
    wifi: {
      name: { type: String },
      pass: { type: String },
    },
    available: {
      type: Boolean,
      default: true,
    },
    deletedAt: {//dùng để soft delete
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
// Tạo compound unique index
roomSchema.index({ roomCode: 1, deletedAt: 1 }, { unique: true });//đảm bảo {roomCode và deletedAt} là unique tránh code lặp với item bị soft delete
const Room = mongoose.model("Room", roomSchema);
export default Room;