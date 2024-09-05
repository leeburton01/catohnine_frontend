
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/shivers (transparent).png";
import facebook from "../assets/fb.jpg"
import instagram from "../assets/insta.jpg";
import youtube from "../assets/3D_Square_with_YouTube_Logo.jpg";


function Footer() {
  return (
    <footer className="footer">
      {/* Left: Logo */}
      <div className="footer-section left">
        <img
          src= {logo}
          alt="Logo"
          className="footer-logo"
        />
      </div>

      
      <div className="footer-section middle">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={instagram}
            alt="Instagram"
            className="social-icon"
          />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={facebook}
            alt="Facebook"
            className="social-icon"
          />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img
            src={youtube}
            alt="YouTube"
            className="social-icon"
          />
        </a>
      </div>

      
      <div className="footer-section right">
        <ol>
          <li>
            <Link to="/films" className="footer-link">
              All Films
            </Link>
          </li>
          <li>
            <Link to="/add-film" className="footer-link">
              Add Film
            </Link>
          </li>
        </ol>
      </div>
    </footer>
  );
}

export default Footer;
