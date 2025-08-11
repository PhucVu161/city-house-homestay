import mongoose from "mongoose";

const houseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true, // ví dụ: H, A, B...
    },
    district: {
      // ví dụ quận Ba Đình
      type: String,
      required: true,
    },
    address: {
      // địa chỉ cụ thể
      type: String,
      required: true,
    },
    guide: {
      // hướng dẫn check in
      type: String,
    },
    secretKey: {
      // mã khóa cổng cần mã hóa bảo mật
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const House = mongoose.model("House", houseSchema);
export default House;
