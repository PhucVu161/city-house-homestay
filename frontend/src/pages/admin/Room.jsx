import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, fetchRooms } from "../../redux/slices/roomSlice";
import { RoomForm } from "../../components";
const initRoom = {
  roomCode: "",
  house: "",
  roomType: "",
  description: "",
  amenities: [],
  images: [],
  wifi: {},
};

export default function Room() {
  const rooms = useSelector((state) => state.room.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRooms());
  }, []);

  const [isDisplayForm, setIsDisplayForm] = useState(false);
  const [formData, setFormData] = useState({ type: "", room: {} });
  const handleAdd = () => {
    setIsDisplayForm(true);
    setFormData(() => ({ type: "Thêm", room: initRoom }));
  };
  const handleUpdate = (room) => {
    setIsDisplayForm(true);
    setFormData({ type: "Sửa", room });
  };

  return (
    <div className="flex flex-col h-full p-4 relative">
      <div>Room</div>
      <div className="grow">
        {rooms.map((room) => (
          <div className="flex justify-between" key={room._id}>
            <div>{room.roomCode}</div>
            <div>{room.house.code}</div>
            <div>{room.roomType.rank}</div>
            <div>{room.amenities}</div>
            <div className="space-x-4">
              <button onClick={() => handleUpdate(room)}>Sửa</button>
              <button
                onClick={() => {
                  dispatch(deleteRoom(room._id));
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
        <RoomForm setIsDisplayForm={setIsDisplayForm} formData={formData} />
      )}
    </div>
  );
}
