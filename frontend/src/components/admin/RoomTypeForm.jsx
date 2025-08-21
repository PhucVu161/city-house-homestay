import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoomType, updateRoomType } from "../../redux/slices/roomTypeSlice.js";
import { ROOMTYPE_LABELS } from "../../constants/roomTypeLabel.js";

export default function RoomTypeForm({ setIsDisplayForm, formData }) {
  //roomTypeLabel giống roomType trong formData nhưng chỉ có trường giống key trong ROOMTYPE_LABELS đã định nghĩa
  const roomTypeLabel = ROOMTYPE_LABELS.reduce((form, label) => {
    form[label.key] = formData.roomType[label.key];
    return form;
  }, {});
  //lưu trạng thái form đang nhập với giá trị khởi tạo roomTypeLabel
  const [roomTypeForm, setRoomTypeForm] = useState(roomTypeLabel);
  //xử lý thêm và sửa
  const dispatch = useDispatch();
  const handleClick = () => {
    if (formData.type === "Thêm") {
        dispatch(addRoomType(roomTypeForm));
    }
    if (formData.type === "Sửa") {
        dispatch(updateRoomType({id: formData.roomType._id, updatedData: roomTypeForm}));
    }
        setIsDisplayForm(false);
  };
  //xử lý cập nhập form giá
  const handlePriceChange = (day, field, value) => {
  setRoomTypeForm(prev => ({
    ...prev,
    prices: {
      ...prev.prices,
      [day]: {
        ...prev.prices[day],
        [field]: value
      }
    }
  }));
};

  return (
    <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 rounded-xl w-[700px] h-[400px] z-10 bg-white">
      <div>RoomType Form</div>
      <div className="grow">
{/* form các thuộc tính của roomTypeLabel trừ giá */}
        {ROOMTYPE_LABELS.filter(label=>label.key!=="prices").map((label) => (
          <div key={label.key}>
            <label htmlFor={label.key}>{label.name}</label>
            <input
                id={label.key}
              type="text"
              value={roomTypeForm[label.key] || ""}
              onChange={(e) => {
                setRoomTypeForm((pre) => ({
                  ...pre,
                  [label.key]: e.target.value,
                }));
              }}
            />
          </div>
        ))}
{/* form nhập giá của room type*/}
        <div>Giá ngày trong tuần (t2-t5)</div>
        <div>
          <label htmlFor="">Ngày đêm</label>
          <input type="text" value={roomTypeForm?.prices?.weekday.allDay||""} onChange={(e)=>handlePriceChange("weekday", "allDay", e.target.value)}/>
        </div>
        <div>
          <label htmlFor="">Nửa ngày</label>
          <input type="text" value={roomTypeForm?.prices?.weekday.halfDay||""} onChange={(e)=>handlePriceChange("weekday", "halfDay", e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Buổi trưa hoặc Chiều</label>
          <input type="text" value={roomTypeForm?.prices?.weekday.timeOfDay||""} onChange={(e)=>handlePriceChange("weekday", "timeOfDay", e.target.value)} />
        </div>
        <div>Giá ngày cuối tuần (t6-cn)</div>
        <div>
          <label htmlFor="">Ngày đêm</label>
          <input type="text" value={roomTypeForm?.prices?.weekend.allDay||""} onChange={(e)=>handlePriceChange("weekend", "allDay", e.target.value)}/>
        </div>
        <div>
          <label htmlFor="">Nửa ngày</label>
          <input type="text" value={roomTypeForm?.prices?.weekend.halfDay||""} onChange={(e)=>handlePriceChange("weekend", "halfDay", e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Buổi trưa hoặc Chiều</label>
          <input type="text" value={roomTypeForm?.prices?.weekend.timeOfDay||""} onChange={(e)=>handlePriceChange("weekend", "timeOfDay", e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Giá theo giờ</label>
          <input type="text" value={roomTypeForm?.prices?.hour||""} onChange={(e)=>{setRoomTypeForm((pre)=>({...pre,prices: {...pre.prices, hour: e.target.value}}))}}/>
        </div>
      </div>
      <div className="flex justify-around">
        <button onClick={() => setIsDisplayForm(false)}>Hủy</button>
        <button onClick={handleClick}>{formData.type}</button>
      </div>
    </div>
  );
}
