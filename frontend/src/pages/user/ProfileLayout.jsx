import { useState } from "react";
import { Link, Outlet } from "react-router";

const OPTIONS = [
  {
    path: "/profile",
    name: "Personal information",
  },
  { 
    path: "/profile/change-password",
    name: "Change password"
  },
];

export default function ProfileLayout() {
  const [isSelected, setIsSelected] = useState("Personal information");
  return (
    <div>
      <div className="ml-4 font-bold">My Profile</div>
      <div className="flex items-center gap-5 border-b-2 border-gray-200">
        {OPTIONS.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`p-3 ${
              isSelected === item.name ? "border-b-4 border-amber-500" : ""
            }`}
            onClick={() => {
              setIsSelected(item.name);
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
