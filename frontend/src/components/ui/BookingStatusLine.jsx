import { MdOutlinePending } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";

export default function BookingStatusLine({ status }) {
  return (
    <>
      {status === "pending" && (
        <div className="flex items-center gap-2">
          <MdOutlinePending className="text-brand-warm"/>
          <div className="font-semibold text-brand-warm">Chờ xác nhận</div>
        </div>
      )}
      {status === "cancelled" && (
        <div className="flex items-center gap-2">
          <FcCancel/>
          <div className="font-semibold text-red-600">Đã hủy</div>
        </div>
      )}
      {status === "confirmed" && (
        <div className="flex items-center gap-2">
          <GiConfirmed className="text-green-600"/>
          <div className="font-semibold text-green-600">Đã xác nhận</div>
        </div>
      )}
    </>
  );
}
