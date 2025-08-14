import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema(
  {
    rank: {
      type: String,
      required: true,
    },
    area: {
      //tính theo m2
      type: Number,
      required: true,
    },
    overview: {
      // review về kiểu phòng
      type: String,
    },
    prices: {//giá theo giờ tính theo VNĐ
      //giá cuối tuần
      weekday: {
        allDay: { type: Number, required: true }, //theo ngày
        halfDay: { type: Number, required: true }, //halfday và overnight
        timeOfDay: { type: Number, required: true }, //afternoon và evening
      },
      //giá trong tuần
      weekend: {
        allDay: { type: Number, required: true }, //theo ngày
        halfDay: { type: Number, required: true }, //halfday và overnight
        timeOfDay: { type: Number, required: true }, //afternoon và evening
      },
      //giá theo giờ
      hour: { type: Number, required: true },
    },
    deletedAt: {//dùng để soft delete
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
// Tạo compound unique index
roomTypeSchema.index({ rank: 1, deletedAt: 1 }, { unique: true });//đảm bảo {rank và deletedAt} là unique tránh code lặp với item bị soft delete
const RoomType = mongoose.model("RoomType", roomTypeSchema);
export default RoomType;