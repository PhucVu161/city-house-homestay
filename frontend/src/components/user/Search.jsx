import { useState } from "react";
import { SearchByHour, SearchHalfDay, SearchByDay } from "../../components";
import { BOOKING_TYPES } from "../../constants/bookingTypeLabel";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentBooking } from "../../redux/slices/bookingSlice";
import { FaCalendarDays, FaArrowRightLong } from "react-icons/fa6";

export default function Search() {
  const [showPicker, setShowPicker] = useState(false);
  const [isRandom, setIsRandom] = useState(true);
  const { bookingType, checkIn, checkOut } = useSelector(
    (state) => state.booking.currentBooking
  );
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center">
      <div className="w-400 h-30 bg-amber-50 rounded-xl">
        <div className="flex justify-center gap-4">
          {BOOKING_TYPES.map((type) => (
            <div
              className={`my-2 cursor-pointer hover:text-orange-500 ${
                type.key === bookingType ? "border-b-2 border-brand-main" : ""
              }`}
              key={type.key}
              onClick={() =>
                dispatch(updateCurrentBooking({ bookingType: type.key }))
              }
            >
              {type.name}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <div className="flex justify-between items-center border-2 border-brand-accent rounded-[40px] w-2/5 p-2 gap-2 relative">
            <div
              className="h-full grow hover:bg-gray-100 flex rounded-4xl justify-around items-center"
              onClick={() => setShowPicker(!showPicker)}
            >
              <FaCalendarDays size={30} className="text-brand-accent " />
              <div className="w-36 text-center">
                <div>Nhận phòng</div>
                <div>
                  {checkIn ? checkIn.format("HH:mm, DD-MM-YYYY") : "Bất kỳ"}
                </div>
              </div>
              <FaArrowRightLong size={30} className="text-brand-accent " />
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
                {bookingType === "byHour" && <SearchByHour setShowPicker={setShowPicker} isRandom={isRandom} setIsRandom={setIsRandom} />}
                {bookingType === "halfDay" && <SearchHalfDay setShowPicker={setShowPicker} isRandom={isRandom} setIsRandom={setIsRandom} />}
                {bookingType === "byDay" && <SearchByDay setShowPicker={setShowPicker} isRandom={isRandom} setIsRandom={setIsRandom} />}
              </div>
            )}
          </div>

          <button className="hover:bg-brand-main hover:text-brand-light w-30 rounded-full border-2 border-brand-accent">
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
}
