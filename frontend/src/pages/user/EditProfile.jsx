import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateCurrentUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function EditProfile() {
  const profile = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState(profile);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateCurrentUser(user)).unwrap();
      toast.success("Cập nhật thành công!");
    } catch (error) {
      toast.error("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex justify-center">
      <form className="p-6 m-10 w-lg h-[560px] space-y-6" onSubmit={handleSave}>
        {/* Thông tin tên người dùng */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên người dùng
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-cool"
            type="text"
            name="username"
            value={user.username}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
        </div>
        {/* Thông tin email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-cool"
            type="email"
            name="email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>
        {/* Thông tin số điện thoại */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-cool"
            type="text"
            name="phone"
            value={user.phone}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, phone: e.target.value }))
            }
            required
          />
        </div>
        {/* Các nút bấm */}
        <div className="flex justify-evenly pt-4">
          <Link
            to="/"
            className="w-16 p-2 border border-brand-cool rounded-lg text-brand-cool text-center"
          >
            Hủy
          </Link>
          <button
            type="submit"
            className="w-16 bg-brand-cool text-white px-4 py-2 rounded-lg transition duration-200 cursor-pointer"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
