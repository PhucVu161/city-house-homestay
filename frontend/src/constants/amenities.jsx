import { FaBath, FaCheckSquare, FaTshirt } from "react-icons/fa";
import { MdOutlineElevator, MdOutlineSoupKitchen } from "react-icons/md";
import { BsProjector } from "react-icons/bs";

export const AMENITIES = [
  { label: "Máy chiếu & Netflix", icon: <BsProjector /> },
  { label: "Thang máy", icon: <MdOutlineElevator /> },
  { label: "Bếp nấu", icon: <MdOutlineSoupKitchen /> },
  { label: "Bồn tắm", icon: <FaBath /> },
  { label: "Tủ check-in", icon: <FaCheckSquare /> },
  { label: "Giặt sấy", icon: <FaTshirt /> },
  { label: "Ban công", icon: <FaTshirt /> },
  { label: "Điều hòa", icon: <FaTshirt /> },
  { label: "Máy lọc không khí", icon: <FaTshirt /> },
];