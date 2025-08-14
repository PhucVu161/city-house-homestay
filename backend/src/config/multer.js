import multer from "multer";
import path from "path";

// Cấu hình Multer để lưu file
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),// Thư mục lưu file
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));// Tên file duy nhất
  },
});
// Chỉ cho phép tải lên file jpeg, jpg và png
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error("Chỉ được upload ảnh jpg, jpeg, png"));
};
// Khởi tạo Multer
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});