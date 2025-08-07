import { useState } from "react";
import { Link } from "react-router";

export default function Header() {
  const [isUser, setIsUser] = useState(true);
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
        {isUser && (
          <>
            <div>
              <Link to="/booking">Booking</Link>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-4">
        {isUser ? (
          <div>
            <Link to="/profile">Welcome user</Link>
          </div>
        ) : (
          <>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="register">Register</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
