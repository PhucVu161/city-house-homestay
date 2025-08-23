import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "../../assets/calendar.css";
import { vi } from "react-day-picker/locale";
import { useDispatch, useSelector } from "react-redux";
import { resetTimeCurrentBooking, updateCurrentBooking, } from "../../redux/slices/bookingSlice";

const CHECKIN_HOURS = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  name: `${String(i).padStart(2, '0')}:00`,
}));
const USAGE_HOURS = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  name: `${i} giờ`,
}));

export default function SearchByHour({ setShowPicker, isRandom, setIsRandom }) {
  const { checkIn } = useSelector((state) => state.booking.currentBooking);
  const dispatch = useDispatch();

  const [usageHours, setUsageHours] = useState(1);
  useEffect(() => {
    if (checkIn) {
      dispatch(
        updateCurrentBooking({ checkOut: dayjs(checkIn).add(usageHours, "hour").toISOString() })
      );
    }
  }, [checkIn, usageHours]);
  useEffect(() => {
    if (isRandom) {
      dispatch(resetTimeCurrentBooking());
      setUsageHours(1);
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
            dispatch(updateCurrentBooking({ checkIn: dayjs(date).toISOString() }));
            setIsRandom(false);
            // setShowPicker(false) // Ẩn sau khi chọn nếu muốn
          }}
          locale={vi}
        />
        <div className="p-6 flex flex-col border-l-2 border-gray-100 w-50">
          <div className="flex flex-col flex-auto">
            <label htmlFor="hourSelector">Giờ nhận phòng</label>
            <select
              className={`${isRandom ? "opacity-30" : ""}`}
              disabled={isRandom}
              name="hourSelector"
              id="hourSelector"
              value={checkIn ? dayjs(checkIn).hour() : 0}
              onChange={(e) =>
                dispatch(
                  updateCurrentBooking({
                    checkIn: dayjs(checkIn).hour(e.target.value).toISOString(),
                  })
                )
              }
            >
              {CHECKIN_HOURS.map((hour)=><option key={hour.value} value={hour.value}>{hour.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col flex-auto">
            <label htmlFor="usageHoursSelector">Giờ sử dụng</label>
            <select
              className={`${isRandom ? "opacity-30" : ""}`}
              disabled={isRandom}
              name="usageHoursSelector"
              id="usageHoursSelector"
              value={usageHours}
              onChange={(e) => setUsageHours(e.target.value)}
            >
              {USAGE_HOURS.map((hour)=><option key={hour.value} value={hour.value}>{hour.name}</option>)}
            </select>
          </div>
        </div>
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
