import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/SHIVERS LOGO.jpg";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background initially
        zIndex: 1000, // Ensure it stays on top of other elements
        transition: "background-color 0.5s ease", // Smooth transition for background
      }}
      className="navbar"
    >
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
        </Link>
      </div>
      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <li style={{ marginRight: "20px", marginTop: "15px" }}>
          <Link
            to="/films"
            style={{
              textDecoration: "none",
              color: "#880808", // White text for visibility
              fontSize: "18px",
            }}
          >
            🔍 Search
          </Link>
        </li>
        <li style={{ marginRight: "50px", marginTop: "15px" }}>
          <Link
            to="/add-film"
            style={{
              textDecoration: "none",
              color: "#880808", // White text for visibility
              fontSize: "18px",
            }}
          >
            ➕ Contribute
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
