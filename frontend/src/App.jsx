import { Routes, Route, Navigate } from "react-router";
import {
  Login,
  Register,
  MainLayout,
  Home,
  SearchRoom,
  About,
  RoomDetail,
} from "./pages";
import {
  UserLayout,
  ProfileLayout,
  EditPassword,
  EditProfile,
  MyBooking,
  RoomBooking,
  RoomBookingSuccess,
} from "./pages/user";
import {
  AdminLayout,
  AdminHomepage,
  ManageRoomLayout,
  ManageBooking,
  ManageUser,
  Room,
  House,
  RoomType,
} from "./pages/admin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./redux/slices/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({
  isAuthenticated,
  user,
  loading,
  allowedAdmin,
  children,
}) => {
  if (isAuthenticated && !user) {
    return <div>Loading...</div>; // hoặc spinner
  }
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (user.isAdmin !== allowedAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, token, loading } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (!user && token) {
      dispatch(fetchCurrentUser());
    }
  }, [user, token, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search-room" element={<SearchRoom />} />
          <Route path="room-detail/:id" element={<RoomDetail />} />
          <Route path="about" element={<About />} />
          {/* Trang giành cho user được ProtectedRoute */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                user={user}
                loading={loading}
                allowedAdmin={false}
              >
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/room-booking" element={<RoomBooking />} />
            <Route
              path="/room-booking-success"
              element={<RoomBookingSuccess />}
            />
            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<EditProfile />} />
              <Route path="change-password" element={<EditPassword />} />
            </Route>
            <Route path="/my-booking" element={<MyBooking />} />
          </Route>
        </Route>
        {/* Trang giành cho admin được ProtectedRoute */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              loading={loading}
              allowedAdmin={true}
            >
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHomepage />} />
          <Route path="manage-booking" element={<ManageBooking />} />
          <Route path="manage-room" element={<ManageRoomLayout />}>
            <Route index element={<Room />} />
            <Route path="house" element={<House />} />
            <Route path="type" element={<RoomType />} />
          </Route>
          <Route path="manage-user" element={<ManageUser />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
