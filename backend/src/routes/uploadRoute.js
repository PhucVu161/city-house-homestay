import express from "express";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/", upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Không có file nào được upload.' });
    }

    const fileInfos = req.files.map(file => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`
    }));

    res.status(200).json({
      message: 'Upload nhiều ảnh thành công!',
      files: fileInfos
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;