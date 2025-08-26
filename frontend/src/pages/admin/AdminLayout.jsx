import { Dashboard } from "../../components";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Dashboard />
      <div className="grow px-16 pt-16 pb-6">
        <Outlet />
      </div>
    </div>
  );
}
