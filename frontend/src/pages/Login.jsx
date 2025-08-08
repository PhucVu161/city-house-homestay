import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
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
    const credentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    try {
      await dispatch(login(credentials)).unwrap(); // Gọi login và chờ kết quả
      console.log("Đăng nhập thành công!");
      // Chuyển hướng hoặc xử lý sau khi đăng nhập
    } catch (err) {
      console.error("Đăng nhập thất bại:", err);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Link
        to="/"
        className="fixed top-4 left-4 bg-white px-3 py-1 rounded shadow hover:bg-gray-100 transition-colors duration-200"
      >
        ← Back home
      </Link>
      <form
        className="w-[400px] h-[300px] rounded-md bg-gray-200 flex flex-col justify-center items-center gap-3"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="">Username</label>
          <br />
          <input
            className="border-2 border-gray-400"
            type="text"
            name="username"
            required
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <br />
          <input
            className="border-2 border-gray-400"
            type="password"
            name="password"
            required
          />
        </div>
        <div>
          Bạn chưa có tài khoản. Vui lòng <Link to={"/register"} className="underline">đăng ký</Link>
        </div>
        <div>
          {loading && <span>Đang đăng nhập...</span>}
          {error && <span>Đăng nhập thất bại {error}</span>}
        </div>
        <button className="bg-sky-500 w-46 active:bg-sky-300">Login</button>
      </form>
    </div>
  );
}
