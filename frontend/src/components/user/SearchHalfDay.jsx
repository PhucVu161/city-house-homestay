import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "../../assets/calendar.css";
import { vi } from "react-day-picker/locale";
import { FaCalendarDays, FaArrowRightLong } from "react-icons/fa6";

export default function SearchHalfDay() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [isRandom, setIsRandom] = useState(true);
  useEffect(() => {
    if (isRandom) {
      setCheckIn(null);
      setCheckOut(null);
    }
  }, [isRandom]);
  return (
        <div className="flex justify-between items-center border-2 border-brand-accent rounded-[40px] w-2/5 p-2 gap-2 relative">
          <div
            className="h-full grow hover:bg-gray-100 flex rounded-4xl justify-around items-center"
            onClick={() => setShowPicker(!showPicker)}
          >
            <FaCalendarDays size={30} className="text-brand-accent "/>
            <div className="w-36 text-center">
              <div>Nhận phòng</div>
              <div>
                {checkIn ? checkIn.format("HH:mm, DD-MM-YYYY") : "Bất kỳ"}
              </div>
            </div>
            <FaArrowRightLong size={30} className="text-brand-accent "/>
            <div className="w-36 text-center">
              <div>Trả phòng</div>
              <div>
                {checkOut ? checkOut.format("HH:mm, DD-MM-YYYY") : "Bất kỳ"}
              </div>
            </div>
          </div>
          {/* Hiển thị DatePicker nếu showPicker = true */}
          {showPicker && (
            <div className=" bg-white rounded-2xl p-3 absolute left-1/2 bottom-[-10px] -translate-x-1/2 translate-y-full shadow-2xl z-10">
              <div className="flex">
                <DayPicker
                  mode="single"
                  showOutsideDays={true} //hiển thị các ngày của tháng khác
                  disabled={(date) => date < new Date()} //thiết lập các ngày bị vô hiệu hóa là những ngày trước thời điểm hiện tại
                  selected={checkIn}
                  onSelect={(date) => {
                    setCheckIn(dayjs(date).hour(22));
                    setCheckOut(dayjs(date).add(1, 'day').hour(10));
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
            </div>
          )}
        </div>
  );
}