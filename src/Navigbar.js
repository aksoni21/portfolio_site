import React, { useState } from "react";
import { Link } from "react-scroll";
import "bootstrap/dist/css/bootstrap.css";

import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./PortfolioContainer/Home/Logo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Navigbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const closeMenu = () => setClick(false);

  return (
    <div className="header">
      <nav className="navbar">
        <Logo />
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={30} style={{ color: "#ffffff" }} />
          ) : (
            <FaBars size={30} style={{ color: "#ffffff" }} />
          )}
        </div>
        <div className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
            <Link
              to="prof"
              spy={true}
              smooth={true}
              offset={-800}
              duration={500}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="bcpr"
              spy={true}
              smooth={true}
              offset={-40}
              duration={500}
              onClick={closeMenu}
            >
              Web3 Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="work"
              spy={true}
              smooth={true}
              offset={-40}
              duration={500}
              onClick={closeMenu}
            >
              Work History
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="cont"
              spy={true}
              smooth={true}
              offset={-40}
              duration={500}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Navigbar;

{
  /* <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dummy" element={<Dummy />} />
      </Routes> */
}
