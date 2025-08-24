import { useState } from "react";
import { ChangeOptionBooking } from "../../components";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { FaPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router";
import axios from "axios";

const checkRoomAvailable = async (roomId, checkIn, checkOut) => {
  try {
    const response = await axios.get("http://localhost:4000/room/check", {
      params: {
        roomId,
        checkIn,
        checkOut,
      },
    });
    return response.data.available; // giả sử API trả về { available: true/false }
  } catch (error) {
    console.error("Lỗi kiểm tra phòng:", error);
    return false;
  }
};

export default function InfoBooking({ allowChange = "" }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isOpenChangeOption, setIsOpenChangeOption] = useState(false);
  const { roomId, bookingType, checkIn, checkOut, totalPrice } = useSelector(
    (state) => state.booking.currentBooking
  );
  const handleBook = async () => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để sử dụng tính năng này!");
      return;
    }
    if (!checkIn || !checkOut) {
      alert("Vui lòng chọn thời gian nhận phòng và trả phòng!");
      return;
    }
    const isAvailable = await checkRoomAvailable(roomId, checkIn, checkOut);
    if (!isAvailable) {
      alert("Phòng đã được đặt trong khoảng thời gian này!\nVui lòng chọn khoảng thời gian khác");
      return;
    }
    navigate("/room-booking"); // chuyển trang
  };
  return (
    <div className="bg-white p-6 rounded-md w-[560px] shadow-xl space-y-3 self-baseline">
      <div className="flex justify-between font-semibold text-xl pb-3 border-b-2 border-gray-300">
        <div>Đặt phòng</div>
        <div
          className={`${allowChange} flex items-center text-sm text-gray-500 cursor-pointer`}
          onClick={() => setIsOpenChangeOption(true)}
        >
          <FaPenToSquare />
          <span>Chỉnh sửa</span>
        </div>
      </div>
      <div>
        <div className="font-medium">Lựa chọn đặt</div>
        <div className="pl-3 py-2 bg-gray-100">
          {bookingType === "byHour" && <span>Theo giờ</span>}
          {bookingType === "halfDay" && <span>Qua đêm</span>}
          {bookingType === "byDay" && <span>Theo ngày</span>}
        </div>
      </div>
      <div>
        <div className="font-medium">Nhận phòng</div>{" "}
        <div className="pl-3 py-2 bg-gray-100">
          {checkIn ? dayjs(checkIn).format("HH:mm, DD/MM/YYYY") : "Chưa chọn"}
        </div>
      </div>
      <div>
        <div className="font-medium">Trả phòng</div>{" "}
        <div className="pl-3 py-2 bg-gray-100">
          {checkOut ? dayjs(checkOut).format("HH:mm, DD/MM/YYYY") : "Chưa chọn"}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-brand-accent">Tổng tiền</div>
        <div className="text-3xl font-bold text-brand-main">
          {totalPrice.toLocaleString("vi-VN")}đ
        </div>
      </div>
      <div className={`${allowChange} space-y-2`}>
        <button
          className="p-4 border-2 border-brand-main w-full text-brand-main font-bold rounded-sm hover:bg-brand-main hover:text-brand-light transition duration-200"
          onClick={handleBook}
        >
          Xác nhận đặt
        </button>
        <button className="p-4 border-2 border-brand-main w-full text-brand-main font-bold rounded-sm hover:bg-brand-main hover:text-brand-light transition duration-200">
          Lưu yêu thích
        </button>
        <button className="p-4 border-2 border-brand-main w-full text-brand-main font-bold rounded-sm hover:bg-brand-main hover:text-brand-light transition duration-200">
          Chia sẻ
        </button>
      </div>
      {isOpenChangeOption && (
        <ChangeOptionBooking setIsOpenChangeOption={setIsOpenChangeOption} />
      )}
    </div>
  );
}