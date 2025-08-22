import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "../../assets/calendar.css";
import { vi } from "react-day-picker/locale";
import { useDispatch, useSelector } from "react-redux";
import { resetTimeCurrentBooking, updateCurrentBooking } from "../../redux/slices/bookingSlice";

export default function SearchHalfDay({ setShowPicker, isRandom, setIsRandom }) {
  const { checkIn } = useSelector((state) => state.booking.currentBooking);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRandom) {
      dispatch(resetTimeCurrentBooking());
    }
  }, [isRandom]);
  return (
    <>
      <div className="flex">
        <DayPicker
          mode="single"
          showOutsideDays={true} //hiển thị các ngày của tháng khác
          disabled={(date) => date < new Date()} //thiết lập các ngày bị vô hiệu hóa là những ngày trước thời điểm hiện tại
          selected={checkIn}
          onSelect={(date) => {
            dispatch(updateCurrentBooking({checkIn: dayjs(date).hour(22).toISOString(), checkOut: dayjs(date).add(1, "day").hour(10).toISOString()}))
            setIsRandom(false);
            // setShowPicker(false) // Ẩn sau khi chọn nếu muốn
          }}
          locale={vi}
        />
      </div>
      <div className="flex justify-between p-3 border-t-2 border-gray-100">
        <button
          className="bg-orange-400 px-3 py-2 rounded-xl active:bg-orange-300"
          onClick={() => setShowPicker(false)}
        >
          Áp dụng
        </button>
        <button
          className={`text-gray-400 border-2 border-gray-400 px-3 py-2 rounded-2xl ${
            isRandom ? "text-orange-400 border-orange-400" : ""
          }`}
          onClick={() => {
            setIsRandom(true);
          }}
        >
          Thời gian bất kỳ
        </button>
      </div>
    </>
  );
}
