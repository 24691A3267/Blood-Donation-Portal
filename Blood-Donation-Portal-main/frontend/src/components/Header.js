import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import '../styles/Header.css';

const Header = () => {
  console.log("Header component rendered");
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
     setShowMenu(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);
  console.log("Token:", token);
console.log("User:", user);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🩸</span>
          Blood Donation Portal
        </Link>

        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/requests">Requests</Link>
          <Link to="/donors">Donors</Link>
          <Link to="/leaderboard">🏆 Leaderboard</Link>

          <ThemeToggle />

          {token && user ? (
 <div
  className="profile-dropdown"
  ref={dropdownRef}
>

    <button
      className="profile-btn"
      onClick={() => setShowMenu(!showMenu)}
    >
      <span className="user-avatar-mini">
        {user.name?.charAt(0)?.toUpperCase()}
      </span>

      <div className="user-info-stack">
        <span className="user-name">
          {user.name} ▼
        </span>

        <span className="user-role-tag">
          {user.role}
        </span>
      </div>
    </button>

    {showMenu && (

      <div className="dropdown-menu">

        <div className="dropdown-header">
          <h4>👤 {user.name}</h4>
          <p>🩸 {user.role} • {user.bloodGroup || "O+"}</p>
          <p>❤️ Donated: {user.donationCount || 0} times</p>
        </div>

        <hr />

        <Link
          to={
            user.role === "donor"
              ? "/donor-dashboard"
              : user.role === "recipient"
              ? "/recipient-dashboard"
              : "/admin-dashboard"
          }
        >
          🏠 Dashboard
        </Link>

        <Link to="/profile">
          👤 My Profile
        </Link>

       

        <hr />

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

    )}

  </div>
) : (
            <div className="auth-links">
              <Link to="/login" className="nav-login-btn">User Login</Link>
              <Link to="/admin-login" className="nav-admin-btn">🛡️ Admin</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
