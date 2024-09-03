import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/shivers (transparent).png";

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
        height: "40px",
        backgroundColor: "rgba(0, 0, 0, 0)",
        zIndex: 1000, 
        transition: "background-color 0.5s ease",
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
              color: "#880808", 
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
              color: "#880808", 
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
