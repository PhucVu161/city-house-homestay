import { useState } from "react";
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

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  if (!user?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState({ isAuthenticated: true, role: "user" });
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
            <ProtectedRoute user={user} allowedRoles={["user"]}>
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
            <ProtectedRoute user={user} allowedRoles={["admin"]}>
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
