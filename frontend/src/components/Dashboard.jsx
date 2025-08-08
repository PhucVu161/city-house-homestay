import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logout } from "../redux/slices/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = ()=>{
    navigate("/");
    dispatch(logout());
  }
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
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <button onClick={()=> {navigate("/")}}>Home</button>
      </div>
    </div>
  )
}
