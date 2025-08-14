import Dashboard from "../../components/Dashboard";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="flex">
      <Dashboard />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
}
