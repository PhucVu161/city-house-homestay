import { useState } from "react";
import { Link, useNavigate } from "react-router";
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
  }
  return (
    <div className="fixed w-full text-center bg-brand-light flex justify-between items-center p-1 z-50 border-b-2 border-b-lime-700">
      <div className="flex items-center">
        <img className="w-14 aspect-square rounded-full" src="/logo.jpg" alt="" />
        <span className="text-brand-main font-extrabold">CITYHOUSE</span>
      </div>
      <div className="flex gap-4">
        <div>
          <Link to="/">Trang chủ</Link>
        </div>
        <div>
          <Link to="/search-room">Tìm phòng</Link>
        </div>
        <div>
          <Link to="/about">Giới thiệu</Link>
        </div>
      </div>
      <div className="flex gap-4">
        {isAuthenticated && user && !user.isAdmin ? (
          <div
            className="relative hover:bg-orange-300 p-2 rounded-2xl cursor-pointer transition-colors duration-200 select-none"
            onClick={() => setIsOpen((pre) => !pre)}
          >
            <div className="font-semibold">Welcome {user.username}</div>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-150"
                >
                  Profile
                </Link>
                <Link
                  to="/my-booking"
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-150"
                >
                  My booking
                </Link>
                <div
                  className="block px-4 py-2 text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-150 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
