import { Dashboard } from "../../components";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Dashboard />
      <div className="grow pl-[360px] pr-16 pt-10 pb-6">
        <Outlet />
      </div>
    </div>
  );
}
