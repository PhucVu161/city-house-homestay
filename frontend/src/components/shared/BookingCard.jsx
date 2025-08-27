import dayjs from "dayjs";
import { FaLaptopCode } from "react-icons/fa6";
import { MdMoreTime } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import { TbArrowLeftFromArc, TbArrowRightFromArc } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";
import { BookingStatusLine }from "../";

function Line({ icon, name, value }) {
  return (
    <div className="flex items-center gap-2">
      <div>{icon}</div>
      {name && <div>{name}</div>}
      <div className="font-semibold">{value}</div>
    </div>
  );
}

export default function BookingCard({ booking }) {
  return (
    <div className="flex gap-4 cursor-pointer">
      <img
        src={`http://localhost:4000/uploads/${booking.roomId.images[0]}`}
        alt=""
        className="w-[360px] h-[240px] rounded-2xl"
      />
      <div className="ml-6 space-y-[4px] text-md">
        <div className="text-3xl">Phòng {booking.roomId.roomCode}</div>
        <Line icon={<FaLaptopCode />} name={"Mã đơn"} value={booking._id} />
        <Line icon={<MdMoreTime />} name={"Tạo lúc"} value={dayjs(booking.createdAt).format("HH:mm - DD/MM/YYYY")} />
        <Line
          icon={<GiPositionMarker />}
          name={"Tại"}
          value={booking.roomId.house.address}
        />
        <Line
          icon={<TbArrowLeftFromArc />}
          name={"Từ"}
          value={dayjs(booking.checkIn).format("HH:mm - DD/MM/YYYY")}
        />
        <Line
          icon={<TbArrowRightFromArc />}
          name={"Đến"}
          value={dayjs(booking.checkOut).format("HH:mm - DD/MM/YYYY")}
        />
        <Line
          icon={<GrMoney />}
          value={booking.totalPrice.toLocaleString("vi-VN") + "đ"}
        />
        <BookingStatusLine status={booking.status} />
      </div>
    </div>
  );
}
