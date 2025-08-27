import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRoomType,
  fetchRoomTypes,
} from "../../redux/slices/roomTypeSlice";
import { RoomTypeForm } from "../../components";
import { MdAddHome } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";

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
          <span>Thêm hạng phòng</span>
        </button>
        <div>
          <span>Sắp xếp: </span>
          <span className="p-2 bg-gray-200 rounded-md">Gần đây nhất</span>
        </div>
      </div>
      {/* Bảng có div để bo góc */}
      <div className="rounded-md overflow-hidden shadow mt-4">
        <table className="w-full text-left border-collapse">
          {/* Phần header của bảng */}
          <thead className="bg-brand-cool3 text-gray-700 font-semibold">
            <tr>
              <th className="p-3">Hạng phòng</th>
              <th className="p-3">Diện tích</th>
              <th className="p-3">Giá theo giờ</th>
              <th className="p-3">Giá qua đêm</th>
              <th className="p-3">Giá nửa ngày</th>
              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>
          {/* Phần dữ liệu của bảng */}
          <tbody>
            {roomTypes.map((roomType) => (
              <tr
                key={roomType._id}
                className="bg-brand-light2 hover:bg-gray-50 transition"
              >
                <td className="p-3">{roomType.rank}</td>
                <td className="p-3">{roomType.area}</td>
                <td className="p-3">
                  {roomType.prices.hour.toLocaleString()}đ
                </td>
                <td className="p-3">
                  {roomType.prices.weekday.halfDay.toLocaleString()}đ -{" "}
                  {roomType.prices.weekend.halfDay.toLocaleString()}đ
                </td>
                <td className="p-3">
                  {roomType.prices.weekday.allDay.toLocaleString()}đ -{" "}
                  {roomType.prices.weekend.allDay.toLocaleString()}đ
                </td>
                <td className="p-3">
                  <div className="flex justify-end gap-4">
                    <button
                      className="flex items-center gap-2 bg-brand-warm2 text-brand-light3 p-2 rounded-md cursor-pointer"
                      onClick={() => handleUpdate(roomType)}
                    >
                      <HiOutlinePencilSquare />
                      <span>Sửa</span>
                    </button>
                    <button
                      className="flex items-center gap-2 bg-red-400 text-brand-light3 p-2 rounded-md cursor-pointer"
                      onClick={() => dispatch(deleteRoomType(roomType._id))}
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
        <RoomTypeForm setIsDisplayForm={setIsDisplayForm} formData={formData} />
      )}
    </div>
  );
}
