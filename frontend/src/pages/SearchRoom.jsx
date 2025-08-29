import { useEffect, useState } from "react";
import { Search, RoomCard, Filter } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, filteredRoom, searchRooms } from "../redux/slices/roomSlice";
import { Link, useNavigate } from "react-router";
import {
  fetchRoomById,
  updateCurrentBooking,
} from "../redux/slices/bookingSlice";
import axios from "axios";
import { BsFillHouseDashFill } from "react-icons/bs";

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

export default function SearchRoom() {
  const [priceType, setPriceType] = useState();
  const rooms = useSelector(filteredRoom);
  const { bookingType, checkIn, checkOut } = useSelector(
    (state) => state.booking.currentBooking
  );
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkIn || !checkOut) {
      dispatch(fetchRooms());
    } else {
      dispatch(searchRooms({ checkIn, checkOut }));
    }
  }, []);
  useEffect(() => {
    setPriceType(bookingType);
  }, [rooms]);
  const handleBook = async (roomId) => {
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
      alert("Phòng đã được đặt trong khoảng thời gian này!\nVui lòng nhấn tìm kiếm để tìm các phòng còn trống");
      return;
    }
    (async () => {
      try {
        await dispatch(fetchRoomById(roomId)).unwrap(); //đợi có lưu thông tin phòng vào currentRoom
        dispatch(updateCurrentBooking({ roomId })); // //để cập nhật id xong tính tiền lấy thông tin phòng từ currentRoom
        navigate("/room-booking"); // chuyển trang
      } catch (err) {
        console.error("Lỗi khi fetch phòng:", err);
      }
    })();
  };
  return (
    <div className="flex flex-col">
      <Search />
      <div className="flex mx-10 mt-4 gap-4">
        <div className="self-baseline w-90 bg-brand-light rounded-2xl">
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
          {rooms?.length ? 
          (<div className="flex flex-col gap-4">
            {rooms.map((room) => (
              <div key={room._id} className="flex m-3 p-3 rounded-2xl shadow-[3px_3px_10px_-1px_gray]">
                <Link to={`/room-detail/${room._id}`}>
                  <RoomCard room={room} />
                </Link>
                <div className="flex flex-col grow text-right justify-between">
                  {priceType === "byHour" && (
                    <div className="">
                      <div className="text-2xl">
                        {room.roomType.prices.hour.toLocaleString("vi-VN")}đ
                      </div>
                      <div>Giá cho 1 giờ</div>
                    </div>
                  )}
                  {priceType === "halfDay" && (
                    <div className="">
                      <div>
                        <span>Chỉ từ</span>
                        <span className="ml-2 text-2xl">
                          {room.roomType.prices.weekday.halfDay.toLocaleString(
                            "vi-VN"
                          )}
                          đ
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
                          {room.roomType.prices.weekday.allDay.toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </span>
                      </div>
                      <div>Giá cho 1 ngày</div>
                    </div>
                  )}
                  <button
                    className="border-2 border-brand-cool rounded-4xl px-6 py-3 self-end hover:text-brand-light hover:bg-brand-cool transition duration-200"
                    onClick={() => handleBook(room._id)}
                  >
                    Đặt phòng
                  </button>
                </div>
              </div>
            ))}            
          </div>) : (
            <div className="flex flex-col items-center mt-16">
              <div className="text-8xl text-gray-600"><BsFillHouseDashFill/></div>
              <div className="text-2xl font-semibold">Không tìm thấy phòng.</div>
              <div>Rất tiếc, chúng tôi không tìm thấy phòng nào phù hợp.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
