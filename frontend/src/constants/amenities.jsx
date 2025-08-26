import { FaBath, FaTshirt } from "react-icons/fa";
import { MdOutlineElevator, MdOutlineSoupKitchen, MdBalcony } from "react-icons/md";
import { BsProjector, BsSnow } from "react-icons/bs";
import { LuAirVent, LuSquareParking, LuCalendarCheck } from "react-icons/lu";
import { FaBowlRice } from "react-icons/fa6";

export const AMENITIES = [
  { label: "Máy chiếu & Netflix", icon: <BsProjector /> },
  { label: "Thang máy", icon: <MdOutlineElevator /> },
  { label: "Bếp nấu", icon: <MdOutlineSoupKitchen /> },
  { label: "Bồn tắm", icon: <FaBath /> },
  { label: "Tự check-in", icon: <LuCalendarCheck /> },
  { label: "Giặt sấy", icon: <FaTshirt /> },
  { label: "Ban công", icon: <MdBalcony /> },
  { label: "Điều hòa", icon: <BsSnow /> },
  { label: "Máy lọc không khí", icon: <LuAirVent /> },
  { label: "Chỗ gửi xe", icon: <LuSquareParking /> },
  { label: "Có gạo và mì", icon: <FaBowlRice /> },
];