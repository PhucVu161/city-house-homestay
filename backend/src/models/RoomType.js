import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema(
  {
    rank: {
      type: String,
      required: true,
      unique: true,
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
  },
  { timestamps: true }
);

const RoomType = mongoose.model("RoomType", roomTypeSchema);
export default RoomType;