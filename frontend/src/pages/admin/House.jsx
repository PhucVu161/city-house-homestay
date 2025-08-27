import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteHouse, fetchHouses } from "../../redux/slices/houseSlice";
import { HouseForm } from "../../components";
import { MdAddHome } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function House() {
  const houses = useSelector((state) => state.house.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHouses());
  }, []);

  const [isDisplayForm, setIsDisplayForm] = useState(false);
  const [formData, setFormData] = useState({ type: "", house: {} });
  const handleAdd = () => {
    setIsDisplayForm(true);
    setFormData(() => ({ type: "Thêm", house: {} }));
  };
  const handleUpdate = (house) => {
    setIsDisplayForm(true);
    setFormData({ type: "Sửa", house });
  };

  return (
    <div className="flex flex-col h-full relative">
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
          <span>Thêm tòa nhà</span>
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
              <th className="p-3">Mã tòa nhà</th>
              <th className="p-3">Địa chỉ</th>
              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>
          {/* Phần dữ liệu của bảng */}
          <tbody>
            {houses.map((house) => (
              <tr
                key={house._id}
                className="bg-brand-light2 hover:bg-gray-50 transition"
              >
                <td className="p-3">{house.code}</td>
                <td className="p-3">{house.address}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-4">
                    <button
                      className="flex items-center gap-2 bg-brand-warm2 text-brand-light3 p-2 rounded-md cursor-pointer"
                      onClick={() => handleUpdate(house)}
                    >
                      <HiOutlinePencilSquare />
                      <span>Sửa</span>
                    </button>
                    <button
                      className="flex items-center gap-2 bg-red-400 text-brand-light3 p-2 rounded-md cursor-pointer"
                      onClick={() => dispatch(deleteHouse(house._id))}
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
        <HouseForm setIsDisplayForm={setIsDisplayForm} formData={formData} />
      )}
    </div>
  );
}
