import { Outlet, NavLink } from "react-router";

export default function ManageRoomLayout() {
  return (
    <div className="flex flex-col gap-6 h-full relative">
      <div className="text-3xl font-bold text-brand-warm">Quản lý phòng</div>
      <div className="flex gap-6 border-b-2 border-gray-200">
        <NavLink
          to={""}
          end
          className={({ isActive }) =>
            `${isActive ? "text-brand-warm border-b-4 border-brand-warm" : ""} p-2 font-semibold`
          }
        >
          Danh sách phòng
        </NavLink>
        <NavLink
          to={"house"}
          className={({ isActive }) =>
            `${isActive ? "text-brand-warm border-b-4 border-brand-warm" : ""} p-2 font-semibold`
          }
        >
          Danh sách tòa nhà
        </NavLink>
        <NavLink
          to={"type"}
          className={({ isActive }) =>
            `${isActive ? "text-brand-warm border-b-4 border-brand-warm" : ""} p-2 font-semibold`
          }
        >
          Danh sách hạng phòng
        </NavLink>
      </div>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
}
