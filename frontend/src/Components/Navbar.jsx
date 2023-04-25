import React from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    navigate("/login");
    toast.success("logged out");
  };
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        <h1>{`< CodePencil />`}</h1>
      </Link>
      <ul>
        <li>
          <Link to="/">
            <span className="nav-link">My Rooms</span>
          </Link>
        </li>
        <li>
          {token ? (
            <button className="primary-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <span className="nav-link">login</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
