import {
  createHouse,
  getAllHouses,
  getHouseById,
  deleteHouse,
  updateHouse
} from "../controllers/houseController.js";
import { authenticateToken, authorizeAdmin } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/", authenticateToken, authorizeAdmin, createHouse);
router.get("/", authenticateToken, authorizeAdmin, getAllHouses);
router.get("/:id", authenticateToken, authorizeAdmin, getHouseById);
router.put("/:id", authenticateToken, authorizeAdmin, updateHouse);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteHouse);

export default router;