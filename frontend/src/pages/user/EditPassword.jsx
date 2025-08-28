import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

export default function EditPassword() {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
    };

    try {
      const result = await dispatch(changePassword(updateData)).unwrap();
      toast.success("Đổi mật khẩu thành công!");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="p-6 m-10 w-lg h-[560px] space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Nhập mật khẩu cũ   */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu cũ
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-cool"
            type="password"
            name="oldPassword"
            required
          />
        </div>
        {/* Nhập mật khẩu mới */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu mới
          </label>
          <input
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-cool"
            type="password"
            name="newPassword"
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
            className="bg-brand-cool text-white px-4 py-2 rounded-md transition duration-200 cursor-pointer"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}
