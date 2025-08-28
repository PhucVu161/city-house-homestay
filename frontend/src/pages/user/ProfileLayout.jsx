import { useState } from "react";
import { Link, Outlet } from "react-router";

const OPTIONS = [
  {
    key: "myInfo",
    path: "/profile",
    name: "Thông tin người dùng",
  },
  { 
    key: "changePassword",
    path: "/profile/change-password",
    name: "Thay đổi mật khẩu"
  },
];

export default function ProfileLayout() {
  const [isSelected, setIsSelected] = useState("myInfo");
  return (
    <div className="flex flex-col px-36 py-16">
      <div className="text-4xl text-brand-warm font-bold mb-4">Hồ sơ của tôi</div>
      <div className="flex items-center gap-5 border-b-2 border-gray-200">
        {OPTIONS.map((item) => (
          <Link
            to={item.path}
            key={item.key}
            className={`p-3 ${
              isSelected === item.key ? "border-b-4 border-brand-warm text-brand-warm" : ""
            }`}
            onClick={() => {
              setIsSelected(item.key);
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="self-center">
      <Outlet />        
      </div>
    </div>
  );
}
