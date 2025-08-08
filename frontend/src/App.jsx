import { Routes, Route, Navigate } from "react-router";
import { Login, Register, MainLayout, Home, About } from "./pages";
import { UserLayout, Profile, Booking } from "./pages/user";
import {
  AdminLayout,
  AdminHomepage,
  ManageHome,
  ManageBooking,
  ManageUser,
} from "./pages/admin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./redux/slices/authSlice";

const ProtectedRoute = ({ isAuthenticated, user, allowedAdmin, children }) => {
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
  const { isAuthenticated, user, token, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user && token) {
      dispatch(fetchCurrentUser());
    }
  }, [user, token, dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              user={user}
              allowedAdmin={false}
            >
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/booking" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            user={user}
            allowedAdmin={true}
          >
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHomepage />} />
        <Route path="manage-booking" element={<ManageBooking />} />
        <Route path="manage-home" element={<ManageHome />} />
        <Route path="manage-user" element={<ManageUser />} />
      </Route>
    </Routes>
  );
}

export default App;
