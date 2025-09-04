import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };
  return (
    <div className="fixed w-full text-center bg-brand-light flex justify-between items-center px-6 py-2 z-50 shadow-lg">
      <div className="flex items-center">
        <img
          className="w-14 aspect-square rounded-full"
          src="/logo.jpg"
          alt=""
        />
        <span className="text-brand-warm text-2xl font-extrabold">
          CITYHOUSE
        </span>
      </div>
      <div className="flex gap-4 font-semibold">
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "bg-brand-cool3 text-brand-warm rounded-xl" : ""
              } flex items-center gap-2 p-3 hover:text-brand-warm cursor-pointer`
            }
          >
            Trang chủ
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/search-room"
            className={({ isActive }) =>
              `${
                isActive ? "bg-brand-cool3 text-brand-warm rounded-xl" : ""
              } flex items-center gap-2 p-3 hover:text-brand-warm cursor-pointer`
            }
          >
            Tìm phòng
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${
                isActive ? "bg-brand-cool3 text-brand-warm rounded-xl" : ""
              } flex items-center gap-2 p-3 hover:text-brand-warm cursor-pointer`
            }
          >
            Giới thiệu
          </NavLink>
        </div>
      </div>
      <div className="flex gap-4">
        {isAuthenticated && user && !user.isAdmin ? (
          <div
            className="relative hover:bg-brand-warm hover:text-brand-light p-4 rounded-full cursor-pointer transition-colors duration-200 select-none"
            onClick={() => setIsOpen((pre) => !pre)}
          >
            <div className="font-semibold">Xin chào, {user.username}</div>

            {isOpen && (
              <div className="absolute right-1/2 translate-x-1/2 mt-5 w-40 text-brand-dark bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-150"
                >
                  Hồ sơ
                </Link>
                <Link
                  to="/my-booking"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-150"
                >
                  Đơn đặt phòng
                </Link>
                <div
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-150 cursor-pointer"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div>
              <Link to="/login" className="py-[10px] px-5 rounded-lg border-2 text-brand-warm2 border-brand-warm2 hover:text-brand-warm">
                Login
              </Link>
            </div>
            <div>
              <Link
                to="/register"
                className="p-3 bg-brand-warm hover:bg-brand-warm2 active:bg-brand-warm text-brand-light2 rounded-lg"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
