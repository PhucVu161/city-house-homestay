import { BsBuildingsFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { LuChartColumnIncreasing } from "react-icons/lu";
import { BsCashCoin } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllUsers } from "../../redux/slices/userSlice.js";
import { fetchRooms } from "../../redux/slices/roomSlice.js";
import { fetchAllBookings } from "../../redux/slices/bookingSlice.js";

function TotalCard({ icon, name, value }) {
  return (
    <div className="flex items-center gap-6 p-4 rounded-2xl bg-brand-light3">
      <div className="text-5xl">{icon}</div>
      <div>
        <div className="text-gray-600">{name}</div>
        <div className="text-3xl">{value}</div>
      </div>
    </div>
  )
}

export default function AdminHomepage() {
  const users = useSelector((state)=>state.user.list);
  const rooms = useSelector((state)=>state.room.list);
  const bookings = useSelector((state)=>state.booking.list);
  const totalRevenue = bookings
  ? bookings
      .filter((booking) => booking.status === "confirmed")
      .reduce((sum, booking) => sum + (booking.totalPrice || 0), 0)
  : 0;
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchAllUsers());
    dispatch(fetchRooms());
    dispatch(fetchAllBookings());
  }, [dispatch]);
  return (
    <div className="flex flex-col h-full">
      <div className="text-3xl font-bold text-brand-warm mb-10">Tổng quan</div>
      {/* Thanh tìm kiếm, thêm và sắp xếp danh sách */}
      <div className="flex items-center gap-6">
        <div className="grow border-2 border-gray-300 rounded-md p-2">
          Tìm kiếm
        </div>
        <button
          className="flex items-center gap-2 bg-brand-cool2 text-brand-light3 p-2 rounded-md"
        >
          <span>Tìm kiếm</span>
        </button>
        <div>
          <span>Sắp xếp: </span>
          <span className="p-2 bg-gray-200 rounded-md">Gần đây nhất</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-16">
        <TotalCard icon={<BsBuildingsFill className="text-blue-400" />} name={"Tổng số phòng phòng"} value={rooms ? rooms.length : "0"} />
        <TotalCard icon={<FaUsers className="text-blue-400" />} name={"Tổng người dùng"} value={users ? users.length : "0"} />
        <TotalCard icon={<LuChartColumnIncreasing className="text-brand-cool2" />} name={"Tổng số đơn đặt phòng"} value={bookings ? bookings.length : "0"} />
        <TotalCard icon={<BsCashCoin className="text-brand-warm2" />} name={"Tổng doanh thu"} value={totalRevenue.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} />
      </div>
    </div>
  )
}
