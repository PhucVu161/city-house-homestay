import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <div className="text-center bg-gray-400 flex justify-between p-3">
      <div>icon</div>
      <div className="flex gap-4">
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/about">About</Link>
        </div>
        {isAuthenticated && user && !user.isAdmin && (
          <>
            <div>
              <Link to="/booking">Booking</Link>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-4">
        {(isAuthenticated && user && !user.isAdmin )? (
          <div>
            <Link to="/profile">Welcome user</Link>
          </div>
        ) : (
          <>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
