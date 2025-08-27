import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { logout } from "../../redux/slices/authSlice";
import { IoIosApps } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdAddHomeWork } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";

const OPTIONS = [
  {
    path: "/admin",
    name: "Tổng quan",
    icon: <IoIosApps />,
  },
  {
    path: "/admin/manage-user",
    name: "Quản lý người dùng",
    icon: <FaUserEdit />,
  },
  {
    path: "/admin/manage-room",
    name: "Quản lý phòng",
    icon: <MdAddHomeWork />,
  },
  {
    path: "/admin/manage-booking",
    name: "Quản lý đơn đặt phòng",
    icon: <LiaFileInvoiceDollarSolid />,
  },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };
  return (
    <div className="flex flex-col gap-12 h-screen p-6 bg-brand-light fixed left-0">
      {/* Phần logo */}
      <div className="flex items-center">
        <img src="/logo.jpg" alt="" className="w-8" />
        <div className="font-bold text-2xl text-brand-warm">City House</div>
      </div>
      {/* Phần người dùng */}
      <div className="flex w-63 gap-2 py-2 px-4 bg-brand-light2 rounded-md">
        <img src="/admin_avt.png" alt="" className="w-12 rounded-full" />
        <div>
          <div className="font-bold">Phuc Vu</div>
          <div className="text-sm">phucvu@gmail.com</div>
        </div>
      </div>
      {/* Phần menu trên */}
      <div className="grow text-xl space-y-2">
        {OPTIONS.map((option) => (
          <NavLink
            key={option.path}
            to={option.path}
            {...(option.path === "/admin" ? { end: true } : {})}
            className={({ isActive }) =>
              `${
                isActive ? "bg-brand-cool3 text-brand-warm rounded-2xl" : ""
              } flex items-center gap-2 p-3 hover:text-brand-warm cursor-pointer`
            }
          >
            {option.icon}
            <span>{option.name}</span>
          </NavLink>
        ))}
      </div>
      {/* Phần menu dưới */}
      <div className="text-xl space-y-2">
        <div className="flex items-center gap-2 p-3 hover:text-brand-warm cursor-pointer">
          <BiSupport />
          <button>Hỗ trợ</button>
        </div>
        <div className="flex items-center gap-2 p-3 hover:text-brand-warm cursor-pointer">
          <IoMdSettings />
          <button>Cài đặt</button>
        </div>
        <div className="flex items-center gap-2 p-3 hover:text-brand-warm cursor-pointer">
          <HiOutlineLogout />
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      </div>
    </div>
  );
}
