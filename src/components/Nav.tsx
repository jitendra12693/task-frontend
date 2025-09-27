import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { token, logout } = useAuth();
  return (
    <nav className="nav">
      <Link to="/dashboard">Home</Link>
      {!token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>  </>
        // <button  onClick={() => { logout(); window.location.href = "/login"; }}>Logout</button>
      )}
    </nav>
  );
}
