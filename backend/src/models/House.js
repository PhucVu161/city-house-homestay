import mongoose from "mongoose";

const houseSchema = new mongoose.Schema(
  {
    code: {// ví dụ: H, A, B...
      type: String,
      required: true,
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
    deletedAt: {//dùng để soft delete
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
// Tạo compound unique index
houseSchema.index({ code: 1, deletedAt: 1 }, { unique: true });//đảm bảo {code và deletedAt} là unique tránh code lặp với item bị soft delete
const House = mongoose.model("House", houseSchema);
export default House;
