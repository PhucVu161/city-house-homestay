import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); //điều hướng sau khi đăng nhập
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  ); // Lấy trạng thái từ store
  useEffect(() => {
  if (isAuthenticated) {
    user.isAdmin ? navigate("/admin") : navigate("/"); // Chuyển hướng đến trang dashboard
  }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
    };
    try {
      await dispatch(register(userData)).unwrap(); // Gọi login và chờ kết quả
      console.log("Đăng ký thành công!");
      // Chuyển hướng hoặc xử lý sau khi đăng nhập
    } catch (err) {
      console.error("Đăng ký thất bại:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Link
        to="/"
        className="fixed top-4 left-4 bg-white px-3 py-1 rounded shadow hover:bg-gray-100 transition-colors duration-200"
      >
        ← Back home
      </Link>
      <form class="w-140 mt-10 p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 class="text-2xl font-bold mb-6 text-center">Đăng ký tài khoản</h2>
        {/* <!-- Họ tên --> */}
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="name">
            Họ tên
          </label>
          <input
            type="text"
            id="name"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập họ tên"
            name="username"
            required
          />
        </div>

        {/* <!-- Email --> */}
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email"
            name="email"
            required
          />
        </div>

        {/* <!-- Mật khẩu --> */}
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2" for="password">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập mật khẩu"
            name="password"
            required
          />
        </div>
        <div>
          Bạn đã có tài khoản.{" "}
          <Link to={"/login"} className="underline">
            Đăng nhập tại đây
          </Link>
        </div>
        <div>
          {loading && <span>Đang đăng ký...</span>}
          {error && <span>Đăng ký thất bại {error}</span>}
        </div>
        {/* <!-- Nút đăng ký --> */}
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}
