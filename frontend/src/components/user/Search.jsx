import { useState } from "react";
import { SearchByHour, SearchHalfDay, SearchByDay } from "../../components";
import { BOOKING_TYPES } from "../../constants/bookingTypeLabel";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentBooking } from "../../redux/slices/bookingSlice";
import { FaCalendarDays, FaArrowRightLong } from "react-icons/fa6";
import { fetchRooms, searchRooms } from "../../redux/slices/roomSlice";
import dayjs from "dayjs";

export default function Search() {
  const { bookingType, checkIn, checkOut } = useSelector(
    (state) => state.booking.currentBooking
  );
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [isRandom, setIsRandom] = useState((checkIn || checkOut) ? false : true);
  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      dispatch(fetchRooms());
    }else{
      dispatch(searchRooms({ checkIn, checkOut }));
    }
  };
  const handleChangeType = (type) => {
    let newCheckIn = checkIn;
    let newCheckOut = checkOut;
    if(checkIn){
      switch(type.key){
        case 'byHour':
          newCheckIn = dayjs(checkIn).toISOString()
          newCheckOut = dayjs(checkIn).add(1, "hour").toISOString()
          break;
        case 'halfDay':
          newCheckIn = dayjs(checkIn).hour(22).toISOString()
          newCheckOut = dayjs(checkIn).add(1, "day").hour(10).toISOString()
          break;
        case 'byDay':
          newCheckIn = dayjs(checkIn).hour(10).toISOString()
          newCheckOut = dayjs(checkIn).add(1, "day").hour(10).toISOString()
          break;
        default:
          break;
      }      
    }
    dispatch(updateCurrentBooking({ bookingType: type.key, checkIn: newCheckIn, checkOut: newCheckOut }))
  }
  return (
    <div className="flex justify-center">
      <div className="w-400 h-36 bg-amber-50 rounded-xl">
        {/* Lựa chọn loại booking */}
        <div className="flex justify-center gap-4">
          {BOOKING_TYPES.map((type) => (
            <div
              className={`flex flex-col items-center my-2 cursor-pointer hover:text-orange-500 ${
                type.key === bookingType ? "border-b-2 border-brand-warm" : ""
              }`}
              key={type.key}
              onClick={()=>handleChangeType(type)}
            >
              <div className="text-3xl">{type.icon}</div>
              <div>{type.name}</div>
            </div>
          ))}
        </div>
        {/* Lịch lựa chọn thời gian theo loại */}
        <div className="flex justify-center gap-4">
          <div className="flex justify-between items-center border-2 border-brand-cool rounded-[40px] w-2/5 p-2 gap-2 relative">
            <div
              className="h-full grow hover:bg-gray-100 flex rounded-4xl justify-around items-center"
              onClick={() => setShowPicker(!showPicker)}
            >
              <FaCalendarDays size={30} className="text-brand-cool " />
              <div className="w-36 text-center">
                <div>Nhận phòng</div>
                <div>
                  {checkIn
                    ? dayjs(checkIn).format("HH:mm, DD-MM-YYYY")
                    : "Bất kỳ"}
                </div>
              </div>
              <FaArrowRightLong size={30} className="text-brand-cool " />
              <div className="w-36 text-center">
                <div>Trả phòng</div>
                <div>
                  {checkOut
                    ? dayjs(checkOut).format("HH:mm, DD-MM-YYYY")
                    : "Bất kỳ"}
                </div>
              </div>
            </div>
            {/* Hiển thị DatePicker nếu showPicker = true */}
            {showPicker && (
              <div className=" bg-white rounded-2xl p-3 absolute left-1/2 bottom-[-10px] -translate-x-1/2 translate-y-full shadow-2xl z-10">
                {bookingType === "byHour" && (
                  <SearchByHour
                    setShowPicker={setShowPicker}
                    isRandom={isRandom}
                    setIsRandom={setIsRandom}
                  />
                )}
                {bookingType === "halfDay" && (
                  <SearchHalfDay
                    setShowPicker={setShowPicker}
                    isRandom={isRandom}
                    setIsRandom={setIsRandom}
                  />
                )}
                {bookingType === "byDay" && (
                  <SearchByDay
                    setShowPicker={setShowPicker}
                    isRandom={isRandom}
                    setIsRandom={setIsRandom}
                  />
                )}
              </div>
            )}
          </div>
          <button
            className={`font-semibold hover:bg-brand-cool hover:text-brand-light w-36 text-brand-cool rounded-full border-2 border-brand-cool transition duration-200`}
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
}
