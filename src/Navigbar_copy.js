import React from "react";
import {Link} from 'react-scroll';
import "bootstrap/dist/css/bootstrap.css";
import Logo from "./PortfolioContainer/Home/Logo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Navigbar_copy = () => {
  return (
    <Navbar bg="myRed" variant="dark" expand="md" collapseOnSelect>
      <Navbar.Brand>
        <Logo />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="n-burger-items">
        <Nav className="n-items">
          {/* <NavDropdown title="Web3 Projects">
            <NavDropdown.Item href="http://nftgame.ankursoni.com/">
              NFT Memory Token Game
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="http://dex.ankursoni.com/">
              Trade Test RAD
            </NavDropdown.Item>
          </NavDropdown> */}
          
          {/* <Link to='work' spy={true} smooth={true} offset={50} duration={500} >Work History</Link>
          <Link to='bcpr' spy={true} smooth={true} offset={50} duration={500} >Web3 Projects</Link> */}
          {/* <NavLink to="/about">About</NavLink> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigbar_copy;

{
  /* <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dummy" element={<Dummy />} />
      </Routes> */
}
