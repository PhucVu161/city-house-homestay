import { Link } from "react-router";


export default function Dashboard() {
  return (
    <div className="w-50 min-h-screen bg-black text-white">
      <div>
        <Link to="/admin">Dashboard</Link>
      </div>
      <div>
        <Link to="/admin/manage-booking">Manage booking</Link>
      </div>
      <div>
        <Link to="/admin/manage-home">Manage home</Link>
      </div>
      <div>
        <Link to="/admin/manage-user">Manage user</Link>
      </div>
    </div>
  )
}
