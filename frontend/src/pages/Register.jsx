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
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.");
      return;
    }
    
    const userData = {
      username: e.target.username.value,
      password,
      email: e.target.email.value,
      phone: e.target.phone.value,
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
      <div className="fixed inset-0 flex items-center justify-center bg-brand-warm/10 backdrop-blur-3xl p-4">
        {/* Thẻ chứa form + ảnh */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
          <div className="grid md:grid-cols-2">
            {/* Ảnh minh họa */}
            <img
              src="login.jpg"
              alt="Minh họa đăng ký"
              className="hidden md:block w-full h-full object-cover"
            />

            {/* Form đăng ký */}
            <form
              className="flex flex-col gap-2 justify-center p-14"
              onSubmit={handleSubmit}
            >
              {/* Tiêu đề */}
              <div className="space-y-1">
                <h1 className="text-4xl font-semibold text-brand-warm tracking-tight">
                  Chào mừng đến với City House Homestay
                </h1>
                <p className="text-sm text-neutral-500">
                  Tạo tài khoản để bắt đầu hành trình trải nghiệm tuyệt vời cùng
                  chúng tôi.
                </p>
              </div>

              {/* Tên người dùng */}
              <div className="space-y-1">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-brand-warm"
                >
                  Tên người dùng
                </label>
                <input
                  id="username"
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 mt-1 text-neutral-900 placeholder-neutral-400
                focus:outline-none focus:ring-2 focus:ring-brand-warm focus:border-brand-warm transition"
                  type="text"
                  name="username"
                  autoComplete="username"
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>

              {/* Số điện thoại */}
              <div className="space-y-1">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-brand-warm"
                >
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 mt-1 text-neutral-900 placeholder-neutral-400
                focus:outline-none focus:ring-2 focus:ring-brand-warm focus:border-brand-warm transition"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder="0123 456 789"
                  required
                />
              </div>

              {/* Email */}
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

              {/* Mật khẩu */}
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
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Xác nhận mật khẩu */}
              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-brand-warm"
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  id="confirmPassword"
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 mt-1 text-neutral-900 placeholder-neutral-400
                focus:outline-none focus:ring-2 focus:ring-brand-warm focus:border-brand-warm transition"
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Chuyển sang đăng nhập nếu đã có tài khoản */}
              <div className="flex items-center justify-between text-sm">
                <div className="text-neutral-600">
                  Đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    className="text-brand-warm underline underline-offset-2 hover:opacity-80 transition"
                  >
                    Đăng nhập
                  </Link>
                </div>
              </div>

              {/* Thông báo trạng thái */}
              <div className="min-h-[24px] text-sm" aria-live="polite">
                {loading && (
                  <span className="text-neutral-600">
                    Đang tạo tài khoản...
                  </span>
                )}
                {error && (
                  <span className="text-red-600">
                    Đăng ký thất bại: {error}
                  </span>
                )}
              </div>

              {/* Nút đăng ký */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-warm text-white py-2.5 rounded-lg font-medium
               hover:bg-brand-warm/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
