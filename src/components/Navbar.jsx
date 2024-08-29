import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/SHIVERS LOGO.jpg"; // Adjust the path as needed

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        marginBottom: "10px",
      }}
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
        <li style={{ marginRight: "20px" }}>
          <Link
            to="/films"
            style={{
              textDecoration: "none",
              color: "#780606",
              fontSize: "18px",
            }}
          >
            🔍 Search
          </Link>
        </li>
        <li>
          <Link
            to="/add-film"
            style={{
              textDecoration: "none",
              color: "#780606",
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
