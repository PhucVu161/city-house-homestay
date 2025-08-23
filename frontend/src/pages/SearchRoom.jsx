import { useEffect, useState } from "react";
import { Search, RoomCard, Filter } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, searchRooms } from "../redux/slices/roomSlice";
import { Link, useNavigate } from "react-router";

export default function SearchRoom() {
  const [priceType, setPriceType] = useState();
  const rooms = useSelector((state) => state.room.list);
  const { bookingType, checkIn, checkOut } = useSelector(
    (state) => state.booking.currentBooking
  );
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkIn || !checkOut) {
      dispatch(fetchRooms());
    } else{
      dispatch(searchRooms({ checkIn, checkOut }));
    }
  }, []);
  useEffect(() => {
    setPriceType(bookingType);
  }, [rooms]);
  const handleBook = () => {
    if (isAuthenticated) {
      navigate("/room-booking");
    } else {
      alert("Vui lòng đăng nhập để sử dụng tính năng này!");
    }
  };
  return (
    <div className="flex flex-col">
      <Search />
      <div className="flex mx-10 mt-4 gap-4">
        <div className="w-90 bg-brand-light rounded-2xl">
          <Filter />
        </div>
        <div className="grow bg-brand-light rounded-2xl">
          <div className="flex justify-between mx-6 mt-4 text-xl">
            <div>
              <div>Kết quả tìm kiếm</div>{" "}
              <div className="text-sm text-gray-500">{`Tìm thấy ${rooms.length} phòng`}</div>
            </div>
            <div>
              Sắp xếp:{" "}
              <span className="p-2 rounded-md bg-gray-100">Phù hợp nhất</span>
            </div>
          </div>
          {rooms.map((room) => (
            <div key={room._id} className="flex m-3 bg-white p-3 rounded-2xl">
              <Link to={`/room-detail/${room._id}`}>
                <RoomCard room={room} />
              </Link>
              <div className="flex flex-col grow text-right justify-between">
                {priceType === "byHour" && (
                  <div className="">
                    <div className="text-2xl">{room.roomType.prices.hour.toLocaleString("vi-VN")}đ</div>
                    <div>Giá cho 1 giờ</div>
                  </div>
                )}
                {priceType === "halfDay" && (
                  <div className="">
                    <div>
                      <span>Chỉ từ</span>
                      <span className="ml-2 text-2xl">
                        {room.roomType.prices.weekday.halfDay.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div>Giá qua đêm</div>
                  </div>
                )}
                {priceType === "byDay" && (
                  <div className="">
                    <div>
                      <span>Chỉ từ</span>
                      <span className="ml-2 text-2xl">
                        {room.roomType.prices.weekday.allDay.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div>Giá cho 1 ngày</div>
                  </div>
                )}
                <button
                  className="border-2 border-brand-accent rounded-4xl px-6 py-3 self-end hover:text-brand-light hover:bg-brand-accent transition duration-200"
                  onClick={handleBook}
                >
                  Đặt phòng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
