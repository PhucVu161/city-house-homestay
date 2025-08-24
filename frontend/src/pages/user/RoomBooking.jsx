import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomById } from "../../redux/slices/bookingSlice";
import { RoomCard, InfoBooking } from "../../components";

export default function RoomBooking() {
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const { roomId } = useSelector((state) => state.booking.currentBooking);
  const room = useSelector((state) => state.booking.currentRoom);
  const dispatch = useDispatch();
  //lấy dữ liệu về room trong currentBooking
  useEffect(() => {
    if (!roomId) return;
    dispatch(fetchRoomById(roomId)); //currentBooking lưu trong session còn currentRoom không lưu nên phải fetch lại nếu reload
  }, [roomId]);
  if (!room) {
    return <div>Đang tải dữ liệu...</div>;
  }
  return (
    <div className="flex flex-col bg-brand-light px-36 pt-16">
      <div className="flex gap-16">
        <div className="grow space-y-4 p-3 shadow-[3px_3px_10px_-3px_gray] rounded-md">
          <div className="text-xl font-semibold border-b-2 border-gray-300 py-3">
            Phòng đã chọn
          </div>
          <RoomCard room={room} />
        </div>
        <InfoBooking allowChange="hidden" />
      </div>
      <div>
        <div className="text-xl font-semibold border-t-2 border-brand-accent py-3 mt-16">
          Vui lòng chọn hình thức thanh toán
        </div>
        <div className="flex flex-col ml-6 gap-6">
          <div>
            <input
              type="radio"
              name="walletRadio"
              id="walletRadio"
              value="wallet"
              checked={paymentMethod === "wallet"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="walletRadio" className="text-xl ml-3">Ví city house</label>
            <div className="ml-8 italic text-gray-500">Số dư trong ví của bạn: <span className="text-green-600 not-italic">2.000.000đ</span></div>
          </div>
          <div>
            <input
              type="radio"
              name="bankingRadio"
              id="bankingRadio"
              value="banking"
              checked={paymentMethod === "banking"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="bankingRadio" className="text-xl ml-3">Chuyển khoản ngân hàng</label>
            <div className="ml-8 italic text-gray-500">Chúng tôi sẽ liên với bạn sớm nhất để hoàn tất thanh toán</div>
          </div>
        </div>
      </div>
      <div className="self-center">
        <button className="bg-brand-accent rounded-full p-3 text-brand-light my-4">
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
}
