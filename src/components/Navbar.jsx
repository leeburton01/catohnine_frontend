import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <ul>
        <li>
          <Link to="/films">Search</Link>
        </li>
        <li>
          <Link to="/contribute">Contribute</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
