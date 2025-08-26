import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBookings } from "../../redux/slices/bookingSlice";
import { GiConfirmed } from "react-icons/gi";
import dayjs from "dayjs";
import { GrMoney } from "react-icons/gr";
import { Link, useNavigate } from "react-router";

function Line({ label, value }) {
  return (
    <div className="flex justify-between">
      <div>{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

export default function RoomBookingSuccess() {
  const { list, loading } = useSelector((state) => state.booking);
  const booking = list?.[0];//lấy booking mới được thêm nằm ở đàu list booking
  const navigate = useNavigate();
  useEffect(() => {//khi reload trang dữ liệu booking vừa tạo sẽ mất và quay về trang chủ
    if (!loading && (!list || !booking)) {
      navigate("/");
    }
  }, [loading, list, booking, navigate]);
  if (!list || !booking) {//tránh lỗi khi chưa có data
    return <div>Đang tải dữ liệu...</div>;
  }
  return (
    <div className="flex items-center gap-16 bg-brand-light px-36 py-16">
      <div className="flex-1 flex flex-col gap-6">
        <GiConfirmed className="text-8xl text-brand-cool" />
        <div className="text-6xl font-bold leading-snug">
          Tạo đơn đặt phòng thành công
        </div>
        <div>
          Cảm ơn bạn đã tin tưởng và lựa chọn đặt phòng cùng City House
          Homestay! Bạn vui lòng hoàn tất thanh toán sớm nhất để tránh hết phòng
          không mong muốn. Sau khi hoàn tất thanh toán đơn đặt phòng của bạn sẽ
          được bên mình xác nhận sớm thôi. Nếu bạn cần hỗ trợ thêm bất cứ điều
          gì trước khi đến, đừng ngần ngại liên hệ với chúng tôi nhé
        </div>
        <div className="flex gap-10">
          <Link
            to={"/my-booking"}
            className="py-3 px-8 rounded-full bg-brand-cool text-brand-light"
          >
            Xem đơn của bạn
          </Link>
          <Link to={"/"} className="font-semibold border-b-2 self-center">
            Quay về trang chủ
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center bg-white rounded-2xl p-10 mb-8">
          <div className="">
            <div className="text-4xl font-extrabold">
              {booking.totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <div className="text-sm">Tổng tiền thanh toán</div>
          </div>
          <GrMoney size={63} className="text-brand-warm" />
        </div>
        <div className="flex flex-col bg-white rounded-2xl p-10 gap-8">
          <div className="font-bold text-2xl">Thông tin đặt phòng</div>
          <Line label={"Mã đặt phòng"} value={booking._id} />
          <Line label={"Tên phòng"} value={booking.roomId.roomCode} />
          <Line label={"Địa chỉ"} value={booking.roomId.house.address} />
          <Line
            label={"Thời gian nhận phòng"}
            value={dayjs(booking.checkIn).format("HH:mm, DD/MM/YYYY")}
          />
          <Line
            label={"Thời gian trả phòng"}
            value={dayjs(booking.checkOut).format("HH:mm, DD/MM/YYYY")}
          />
          <Line
            label={"Trạng thái đơn"}
            value={
              <button className="bg-brand-warm p-3 rounded-md text-brand-light">
                Chờ xác nhận
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}
