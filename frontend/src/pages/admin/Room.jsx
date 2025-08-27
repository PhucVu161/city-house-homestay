import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, fetchRooms } from "../../redux/slices/roomSlice";
import { RoomForm } from "../../components";
import { MdAddHome } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
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
    <div className="flex flex-col h-full">
      {/* Thanh tìm kiếm, thêm và sắp xếp danh sách */}
      <div className="flex items-center gap-6">
        <div className="grow border-2 border-gray-300 rounded-md p-2">
          Tìm kiếm
        </div>
        <button
          className="flex items-center gap-2 bg-brand-cool2 text-brand-light3 p-2 rounded-md"
          onClick={handleAdd}
        >
          <MdAddHome />
          <span>Thêm phòng</span>
        </button>
        <div>
          <span>Sắp xếp: </span>
          <span className="p-2 bg-gray-200 rounded-md">Gần đây nhất</span>
        </div>
      </div>
      {/* Bảng có div để bo góc */}
      <div className="rounded-md overflow-hidden shadow mt-4">
        <table className="w-full text-left border-collapse rounded-2xl">
          {/* Phần header của bảng */}
          <thead className="bg-brand-cool3 text-gray-700 font-semibold">
            <tr>
              <th className="p-3">Tên phòng</th>
              <th className="p-3">Phòng cách</th>
              <th className="p-3">Hạng phòng</th>
              <th className="p-3">Tòa nhà</th>
              <th className="p-3">Địa chỉ</th>
              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>
          {/* Phần dữ liệu của bảng */}
          <tbody>
            {rooms.map((room) => (
              <tr
                key={room._id}
                className="bg-brand-light2 hover:bg-gray-50 transition"
              >
                <td className="p-2">{room.roomCode}</td>
                <td className="p-2">{room.style}</td>
                <td className="p-2">{room.roomType.rank}</td>
                <td className="p-2">Tòa {room.house.code}</td>
                <td className="p-2">{room.house.address}</td>
                <td className="p-2">
                  <div className="flex justify-end gap-4">
                    <button
                      className="flex items-center gap-2 bg-brand-warm2 text-brand-light3 p-2 rounded-md cursor-pointer"
                      onClick={() => handleUpdate(room)}
                    >
                      <HiOutlinePencilSquare />
                      <span>Sửa</span>
                    </button>
                    <button
                      className="flex items-center gap-2 bg-red-400 text-brand-light3 p-2 rounded-md cursor-pointer"
                      onClick={() => dispatch(deleteRoom(room._id))}
                    >
                      <RiDeleteBin6Line />
                      <span>Xóa</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDisplayForm && (
        // {/* Lớp phủ */}
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 flex items-center justify-center">
          <RoomForm setIsDisplayForm={setIsDisplayForm} formData={formData} />
        </div>
      )}
    </div>
  );
}
