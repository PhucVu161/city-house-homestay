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
      email: e.target.email.value,
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
    <>
      {/* Hình nền đằng sau */}
      <img src="/image.png" alt="" className="w-screen h-screen" />
      {/* Nút quay về trang chủ */}
      <Link
        to="/"
        className="fixed top-4 left-4 bg-white px-3 py-1 rounded shadow hover:bg-gray-100 transition-colors duration-200 z-10"
      >
        ← Back home
      </Link>
      {/* Lớp phủ + căn giữa */}
      <div className="fixed inset-0 flex items-center justify-center bg-brand-warm/10 backdrop-blur-2xl p-4">
        {/* Thẻ chứa form + ảnh */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
          <div className="grid md:grid-cols-2">
            {/* Ảnh minh họa: ẩn trên màn nhỏ, phủ kín cột trái trên màn vừa+ */}
            <img
              src="login.jpg"
              alt="Minh họa đăng nhập"
              className="hidden md:block w-full h-full object-cover"
            />

            {/* Form */}
            <form
              className="flex flex-col gap-6 justify-center p-14"
              onSubmit={handleSubmit}
            >
              {/* Tiêu đề form */}
              <div className="space-y-1">
                <h1 className="text-4xl font-semibold text-brand-warm tracking-tight">
                  City House Homestay xin chào
                </h1>
                <p className="text-sm text-neutral-500">
                  Đặt phòng cùng chúng tôi để có nhưng trải nghiệm tuyệt vời ngay nào.
                </p>
              </div>
              {/* Nhập thông tin email đăng nhập */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-brand-warm"
                >
                  Email
                </label>
                <input
                  id="email"
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 mt-1 text-neutral-900 placeholder-neutral-400
                      focus:outline-none focus:ring-2 focus:ring-brand-warm focus:border-brand-warm transition"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              {/* Nhập mật khẩu đăng nhập */}
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-brand-warm"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 mt-1 text-neutral-900 placeholder-neutral-400
                      focus:outline-none focus:ring-2 focus:ring-brand-warm focus:border-brand-warm transition"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                />
              </div>
              {/* Thông báo chuyển trang đăng ký hoặc trang quên mật khẩu */}
              <div className="flex items-center justify-between text-sm">
                <div className="text-neutral-600">
                  Bạn chưa có tài khoản?{" "}
                  <Link
                    to="/register"
                    className="text-brand-warm underline underline-offset-2 hover:opacity-80 transition"
                  >
                    Đăng ký
                  </Link>
                </div>
                <button
                  type="button"
                  className="text-neutral-500 hover:text-neutral-700 transition"
                  // TODO: Gắn link quên mật khẩu nếu có
                >
                  Quên mật khẩu?
                </button>
              </div>
              {/* Nút đăng nhập và thông báo  */}
              <div className="min-h-[24px] text-sm" aria-live="polite">
                {loading && (
                  <span className="text-neutral-600">Đang đăng nhập...</span>
                )}
                {error && (
                  <span className="text-red-600">
                    Đăng nhập thất bại: {error}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-warm text-white py-2.5 rounded-lg font-medium
                     hover:bg-brand-warm/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
