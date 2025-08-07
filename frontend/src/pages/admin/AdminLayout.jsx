import Dashboard from "../../components/Dashboard"
import { Outlet } from "react-router"

export default function AdminLayout() {
  return (
    <div className="flex">
        <Dashboard />
        <Outlet />
    </div>
  )
}
