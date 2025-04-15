// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">API Middleware</Link>
        <div className="nav-links">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
