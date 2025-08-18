import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import "react-day-picker/style.css"
import '../assets/calendar.css';
import { vi } from "react-day-picker/locale"

export default function About() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div className='bg-amber-100 w-full h-full p-4'>
      <div className='flex flex-col items-center gap-4'>
        {/* Div duy nhất để chọn ngày */}
        <div
          className='flex p-2 bg-white rounded-md mt-2 cursor-pointer hover:bg-gray-100 gap-4 justify-between'
          onClick={() => setShowPicker(!showPicker)}
        >
          <div>Nhận phòng</div>
          <div>Trả phòng</div>
          <div>
            {selectedDate ? selectedDate.toLocaleDateString() : 'Chọn ngày'}
          </div>
        </div>

        {/* Hiển thị DatePicker nếu showPicker = true */}
        {showPicker && (
          <div className=' bg-white rounded-2xl p-3'>
            <div className='flex'>
              <DayPicker
                mode="single"
                showOutsideDays={true} //hiển thị các ngày của tháng khác
                disabled={(date) => date < new Date()} //thiết lập các ngày bị vô hiệu hóa là những ngày trước thời điểm hiện tại
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  // setShowPicker(false) // Ẩn sau khi chọn nếu muốn
                }}
                locale={vi}
              />
              <div className='p-6 flex flex-col border-l-2 border-gray-200'>
                <div className='flex flex-col grow'>
                  <label htmlFor="">Giờ nhận phòng</label>
                  <select name="" id="">
                    <option value="">01:00</option>
                    <option value="">02:00</option>
                    <option value="">03:00</option>
                  </select>
                </div>
                <div className='flex flex-col grow'>
                  <label htmlFor="">Giờ sử dụng</label>
                  <select name="" id="">
                    <option value="">1 giờ</option>
                    <option value="">2 giờ</option>
                    <option value="">3 giờ</option>
                  </select>
                </div>
              </div>              
            </div>
            <div>
              <button>Áp dụng</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
