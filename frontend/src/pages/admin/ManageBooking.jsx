import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminCancelBooking,
  adminConfirmBooking,
  fetchAllBookings,
  selectBookingsByStatus,
} from "../../redux/slices/bookingSlice";
import { SlNote } from "react-icons/sl";
import dayjs from "dayjs";
import { BOOKING_STATUS_OPTIONS } from "../../constants/bookingStatusOptions.js";
import { BookingStatusLine } from "../../components";
import { FaEye } from "react-icons/fa";
import { TbFileLike } from "react-icons/tb";
import { TbCancel } from "react-icons/tb";

export default function ManageBooking() {
  const [isSelected, setIsSelected] = useState("all");
  const filteredBookings = useSelector((state) =>
    selectBookingsByStatus(state, isSelected)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);
  const handleConfirm = (bookingId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xác nhận đơn?");
    if (confirmed) {
      dispatch(adminConfirmBooking(bookingId));
    }
  };
  const handleCancel = (bookingId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn?");
    if (confirmed) {
      dispatch(adminCancelBooking(bookingId));
    }
  };
  if (!filteredBookings) {
    return <div>Đang tải dữ liệu...</div>;
  }
  return (
    <div className="flex flex-col gap-6 h-full relative">
      {/* Tiêu đề */}
      <div className="text-3xl font-bold text-brand-warm">
        Quản lý đơn đặt phòng
      </div>
      {/* Thanh lựa chọn trạng thái để lọc đơn đặt phòng */}
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
      {/* Thanh tìm kiếm, thêm và sắp xếp danh sách */}
      <div className="flex items-center gap-6">
        <div className="grow border-2 border-gray-300 rounded-md p-2">
          Tìm kiếm
        </div>
        <button className="flex items-center gap-2 bg-brand-cool2 text-brand-light3 p-2 rounded-md">
          <span>no name</span>
        </button>
        <div>
          <span>Sắp xếp: </span>
          <span className="p-2 bg-gray-200 rounded-md">Gần đây nhất</span>
        </div>
      </div>
      {/* Danh sách đơn đặt phòng */}
      {filteredBookings.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2 mt-16">
          <SlNote size={36} className="text-gray-500" />
          <span className="text-gray-500 italic">
            Không có đơn đặt nào thuộc trạng thái này.
          </span>
        </div>
      ) : (
        <div>
          <div className="text-sm text-gray-500 italic">Bạn có {filteredBookings.length} đơn</div>
          <div className="rounded-md overflow-hidden shadow mt-4">
            <table className="w-full text-left border-collapse rounded-2xl">
              {/* Phần header của bảng */}
              <thead className="bg-brand-cool3 text-gray-700 font-semibold">
                <tr>
                  <th className="p-3">Thông tin người đặt</th>
                  <th className="p-3">Thông tin phòng</th>
                  <th className="p-3">Thời gian</th>
                  <th className="p-3">Tổng tiền</th>
                  <th className="p-3">Ngày tạo</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3">Thao tác</th>
                </tr>
              </thead>
              {/* Phần dữ liệu của bảng */}
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="bg-brand-light2 hover:bg-gray-50 transition"
                  >
                    <td className="p-2">
                      <div className="font-semibold">
                        {booking.userId.username}
                      </div>
                      <div className="italic text-sm">
                        {booking.userId.email}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="font-semibold">
                        Phòng {booking.roomId.roomCode}
                      </div>
                      <div className="italic text-sm">
                        {booking.roomId.house.address}
                      </div>
                    </td>
                    <td className="p-2 text-sm">
                      <div>
                        Từ {dayjs(booking.checkIn).format("HH:mm, DD/MM/YYYY")}
                      </div>
                      <div>
                        đến{" "}
                        {dayjs(booking.checkOut).format("HH:mm, DD/MM/YYYY")}
                      </div>
                    </td>
                    <td className="p-2 font-semibold">
                      {booking.totalPrice.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="p-2 text-sm">
                      {dayjs(booking.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="p-2 text-sm">
                      <BookingStatusLine status={booking.status} />
                    </td>
                    <td className="p-2 text-sm">
                      <div className="flex gap-4">
                        {/* Nút Chi tiết luôn hiển thị */}
                        <button className="flex items-center gap-2 bg-blue-400 text-brand-light3 p-2 rounded-md cursor-pointer">
                          <FaEye />
                          <span>Chi tiết</span>
                        </button>
                        {/* Nếu status là pending thì hiển thị cả Xác nhận và Hủy */}
                        {booking.status === "pending" && (
                          <>
                            <button
                              className="flex items-center gap-2 bg-brand-cool2 text-brand-light3 p-2 rounded-md cursor-pointer"
                              onClick={() => handleConfirm(booking._id)}
                            >
                              <TbFileLike />
                              <span>Xác nhận</span>
                            </button>
                            <button
                              className="flex items-center gap-2 bg-red-400 text-brand-light3 p-2 rounded-md cursor-pointer"
                              onClick={() => handleCancel(booking._id)}
                            >
                              <TbCancel />
                              <span>Hủy</span>
                            </button>
                          </>
                        )}
                        {/* Nếu status là confirmed thì chỉ hiển thị nút Hủy */}
                        {booking.status === "confirmed" &&
                          new Date() < new Date(booking.checkOut) && (
                            <button
                              className="flex items-center gap-2 bg-red-400 text-brand-light3 p-2 rounded-md cursor-pointer"
                              onClick={() => handleCancel(booking._id)}
                            >
                              <TbCancel />
                              <span>Hủy</span>
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
