import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRoomById } from '../../redux/slices/bookingSlice';
import { RoomCard, InfoBooking } from '../../components';

export default function RoomBooking() {
  const { roomId } = useSelector((state)=>state.booking.currentBooking);
  const room = useSelector((state)=>state.booking.currentRoom);
  const dispatch = useDispatch();
  //lấy dữ liệu về room trong currentBooking
  useEffect(()=>{
    if(!roomId) return;
    dispatch(fetchRoomById(roomId));//currentBooking lưu trong session còn currentRoom không lưu nên phải fetch lại nếu reload
  }, [roomId]);
  if(!room){
    return <div>Đang tải dữ liệu...</div>
  }
  return (
    <div className="flex flex-col bg-brand-light px-36 pt-16">
      <div className='flex gap-16'>
        <div className='grow space-y-4'>
          <div className='text-xl font-semibold border-b-2 border-gray-300'>Phòng đã chọn</div>
          <RoomCard room={room} />
        </div>
          <InfoBooking allowChange='hidden' />        
      </div>
      <div>
        Xác nhận thanh toán
      </div>
    </div>
  )
}