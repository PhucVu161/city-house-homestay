import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyBookings,
  selectBookingsByStatus,
  userCancelBooking,
} from "../../redux/slices/bookingSlice";
import { BookingCard } from "../../components";
import { SlNote } from "react-icons/sl";
import { BOOKING_STATUS_OPTIONS } from "../../constants/bookingStatusOptions";

export default function MyBooking() {
  const [isSelected, setIsSelected] = useState("all");
  const filteredBookings = useSelector((state) =>
    selectBookingsByStatus(state, isSelected)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, []);
  const handleCancel = (bookingId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn?");
    if (confirmed) {
      dispatch(userCancelBooking(bookingId));
    }
  };
  if (!filteredBookings) {
    return <div>Đang tải dữ liệu...</div>;
  }
  return (
    <div className="flex flex-col px-36 py-16">
      <div className="text-2xl font-bold">Đơn đặt phòng của tôi</div>
      {/* Các lựa chọn trạng thái để lọc đơn đặt phòng */}
      <div className="flex items-center gap-5 border-b-2 border-gray-200">
        {BOOKING_STATUS_OPTIONS.map((item) => (
          <button
            key={item.key}
            className={`p-3 ${
              isSelected === item.key
                ? "border-b-4 border-brand-warm text-brand-warm"
                : ""
            }`}
            onClick={() => {
              setIsSelected(item.key);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      {/* Hiển thị thông tin danh sách đơn đặt phòng */}
      <div className="mt-6 space-y-6">
        {/* Số lượng đơn và cách sắp xếp hiển thị */}
        <div className="flex justify-between">
          <div className="text-sm text-gray-500">
            Bạn có {filteredBookings.length} đơn
          </div>
          <div>
            Sắp xếp:{" "}
            <span className="p-2 rounded-md bg-gray-100">Phù hợp nhất</span>
          </div>
        </div>
        {/* Danh sách đơn đặt */}
        <div className="flex flex-col gap-6 min-h-[460px]">
          {filteredBookings.length === 0 ? (
            <div className="flex flex-col justify-center items-center gap-2 mt-16">
              <SlNote size={36} className="text-gray-500" />
              <span className="text-gray-500 italic">Không có đơn đặt nào thuộc trạng thái này.</span>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-brand-light px-8 py-4 rounded-3xl flex justify-between self-center w-[1200px] gap-10"
              >
                <BookingCard booking={booking} />
                <div className="flex flex-col gap-4 mt-2">
                  <button className="py-2 w-36 rounded-md bg-blue-600 text-brand-light cursor-pointer">
                    Xem chi tiết
                  </button>
                  {booking.status === "pending" && (
                    <button
                      className="py-2 w-36 rounded-md bg-red-600 text-brand-light cursor-pointer"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Hủy đơn đặt
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
