import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logout } from "../redux/slices/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogout = async () => {
  await dispatch(logout());
  navigate("/");
};
  return (
    <div className="w-50 min-h-screen bg-black text-white">
      <div>
        <Link to="/admin">Dashboard</Link>
      </div>
      <div>
        <Link to="/admin/manage-user">Manage user</Link>
      </div>
      <div>
        <Link to="/admin/manage-room">Manage room</Link>
      </div>
      <div>
        <Link to="/admin/manage-booking">Manage booking</Link>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}
