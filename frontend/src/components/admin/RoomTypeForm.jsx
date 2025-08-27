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
<div className="flex flex-col rounded-xl w-[700px] h-[700px] z-10 bg-white p-6 space-y-6 shadow-lg overflow-y-auto">
  {(formData.type === "Thêm") && <div className="self-center text-2xl font-bold text-yellow-600">Thêm hạng phòng</div>}
  {(formData.type === "Sửa") && <div className="self-center text-2xl font-bold text-yellow-600">Sửa thông tin hạng phòng</div>}

  <div className="grow space-y-4 text-sm text-gray-700">
    {/* Các thuộc tính trừ giá */}
    {ROOMTYPE_LABELS.filter(label => label.key !== "prices").map((label) => (
      <div key={label.key}>
        <label htmlFor={label.key} className="block font-medium mb-1">{label.name}</label>
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
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
    ))}

    {/* Giá ngày trong tuần */}
    <div className="space-y-2">
      <div className="font-semibold text-gray-800">Giá ngày trong tuần (T2–T5)</div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-1">Ngày đêm</label>
          <input
            type="text"
            value={roomTypeForm?.prices?.weekday.allDay || ""}
            onChange={(e) => handlePriceChange("weekday", "allDay", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block mb-1">Nửa ngày</label>
          <input
            type="text"
            value={roomTypeForm?.prices?.weekday.halfDay || ""}
            onChange={(e) => handlePriceChange("weekday", "halfDay", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block mb-1">Trưa/Chiều</label>
          <input
            type="text"
            value={roomTypeForm?.prices?.weekday.timeOfDay || ""}
            onChange={(e) => handlePriceChange("weekday", "timeOfDay", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>
    </div>

    {/* Giá cuối tuần */}
    <div className="space-y-2">
      <div className="font-semibold text-gray-800">Giá cuối tuần (T6–CN)</div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-1">Ngày đêm</label>
          <input
            type="text"
            value={roomTypeForm?.prices?.weekend.allDay || ""}
            onChange={(e) => handlePriceChange("weekend", "allDay", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block mb-1">Nửa ngày</label>
          <input
            type="text"
            value={roomTypeForm?.prices?.weekend.halfDay || ""}
            onChange={(e) => handlePriceChange("weekend", "halfDay", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="block mb-1">Trưa/Chiều</label>
          <input
            type="text"
            value={roomTypeForm?.prices?.weekend.timeOfDay || ""}
            onChange={(e) => handlePriceChange("weekend", "timeOfDay", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>
    </div>

    {/* Giá theo giờ */}
    <div>
      <label className="block font-medium mb-1">Giá theo giờ</label>
      <input
        type="text"
        value={roomTypeForm?.prices?.hour || ""}
        onChange={(e) => {
          setRoomTypeForm((pre) => ({
            ...pre,
            prices: { ...pre.prices, hour: e.target.value },
          }));
        }}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  </div>

  {/* Nút hành động */}
  <div className="flex justify-end gap-4 pt-2">
    <button
      onClick={() => setIsDisplayForm(false)}
      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
    >
      Hủy
    </button>
    <button
      onClick={handleClick}
      className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md transition"
    >
      {formData.type}
    </button>
  </div>
</div>
  );
}
