import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/slices/userSlice';
import { HiUserAdd } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { MdOutlineLockPerson } from "react-icons/md";
import dayjs from 'dayjs';

export default function ManageUser() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.list);
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) return <p>Đang tải danh sách người dùng...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  return (
    <div className="flex flex-col h-full">
      <div className="text-3xl font-bold text-brand-warm mb-10">Quản lý người dùng</div>
      {/* Thanh tìm kiếm, thêm và sắp xếp danh sách */}
      <div className="flex items-center gap-6">
        <div className="grow border-2 border-gray-300 rounded-md p-2">
          Tìm kiếm
        </div>
        <button
          className="flex items-center gap-2 bg-brand-cool2 text-brand-light3 p-2 rounded-md"
        >
          <HiUserAdd />
          <span>Thêm người dùng</span>
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
              <th className="p-3">Tên người dùng</th>
              <th className="p-3">Email</th>
              <th className="p-3">Ngày tạo</th>
              <th className="p-3 text-right">Thao tác</th>
            </tr>
          </thead>
          {/* Phần dữ liệu của bảng */}
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-brand-light2 hover:bg-gray-50 transition"
              >
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{dayjs(user.createdAt).format("HH:mm:ss - DD/MM/YYYY")}</td>
                <td className="p-2">
                  <div className="flex justify-end gap-4">
                    <button
                      className="flex items-center gap-2 bg-blue-400 text-brand-light3 p-2 rounded-md cursor-pointer"
                    >
                      <FaEye />
                      <span>Xem đơn</span>
                    </button>
                    <button
                      className="flex items-center gap-2 bg-red-400 text-brand-light3 p-2 rounded-md cursor-pointer"
                    >
                      <MdOutlineLockPerson />
                      <span>Khóa</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>        
      </div>
    </div>
  )
}
