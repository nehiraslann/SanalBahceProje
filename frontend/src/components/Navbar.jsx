import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">

      <div className="logo">
        🌿 Sanal Bahçem
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Anasayfa
        </NavLink>

        <NavLink
          to="/dashboard"
          onClick={closeMenu}
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Bahçem
        </NavLink>

        <NavLink
          to="/notes"
          onClick={closeMenu}
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Günlük
        </NavLink>

        <NavLink
          to="/profile"
          onClick={closeMenu}
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Profilim
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;