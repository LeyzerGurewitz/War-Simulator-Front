import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/features/user/userSlice";
import { AppDispatch } from "../../store/store";
import { RootState } from "../../store/store"; 
import { useNavigate } from "react-router-dom"; 

import "./navBar.css";

const NavBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const user = useSelector((state: RootState) => state.user.user);

  
  const handleLogout = () => {
    dispatch(logoutUser()); 
    localStorage.removeItem("token"); 
    navigate("/login");
  };

 
  const isAuthenticated = user !== null;

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/login" className="navbar-link">
          Login
        </Link>
      </div>
      <h1>WAR SIMULATOR</h1>
      <div className="navbar-actions">
        {isAuthenticated ? (
          <button className="navbar-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="navbar-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
