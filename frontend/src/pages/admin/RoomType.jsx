import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoomType,
  fetchRoomTypes,
} from "../../redux/slices/roomTypeSlice";
import RoomTypeForm from "../../components/RoomTypeForm";
const initRoomType = {
  prices: {
    weekday: {
      allDay: "",
      halfDay: "",
      timeOfDay: "",
    },
    weekend: {
      allDay: "",
      halfDay: "",
      timeOfDay: "",
    },
    hour: "",
  },
  rank: "",
  area: "",
  overview: "",
};

export default function RoomType() {
  const roomTypes = useSelector((state) => state.roomType.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoomTypes());
  }, []);

  const [isDisplayForm, setIsDisplayForm] = useState(false);
  const [formData, setFormData] = useState({ type: "", roomType: {} });
  const handleAdd = () => {
    setIsDisplayForm(true);
    setFormData(() => ({ type: "Thêm", roomType: initRoomType }));
  };
  const handleUpdate = (roomType) => {
    setIsDisplayForm(true);
    setFormData({ type: "Sửa", roomType });
  };

  return (
    <div className="flex flex-col h-full p-4 relative">
      <div>RoomType</div>
      <div className="grow">
        {roomTypes.map((roomType) => (
          <div className="flex justify-between" key={roomType._id}>
            <div>{roomType.rank}</div>
            <div>{roomType.area}</div>
            <div>{roomType.overview||" "}</div>
            <div className="space-x-4">
              <button onClick={() => handleUpdate(roomType)}>Sửa</button>
              <button
                onClick={() => {
                  dispatch(deleteRoomType(roomType._id));
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="flex justify-center" onClick={handleAdd}>
        Thêm
      </button>

      {isDisplayForm && (
        <RoomTypeForm setIsDisplayForm={setIsDisplayForm} formData={formData} />
      )}
    </div>
  );
}
