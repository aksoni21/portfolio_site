import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navigbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  return (
    <div>
      <nav className="navbar">
        {/* <div className="brand-title"> */}
          <Logo />
        {/* </div> */}
        <a href="#" className="toggle-button" onClick={handleClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className={click ? "navbar-links.active" : "navbar-links "}>
          <ul className="nse">
            <li className="nli">
              <Link className="nla" to="/ExploreAll">
                Explore Encanto
              </Link>
            </li>
            <li className="nli">
              <Link className="nla" to="/CreateItem">
                Create NFT
              </Link>
            </li>
            <li className="nli">
              <Link className="nla" to="/MyNFTs">
                My NFTs
              </Link>
            </li>
            {/* <li className="nli">
            <Link className='nla' to="/Generative">Generative Art</Link>
            </li> */}
            <li className="nli">
              <Link className="nla" to="/Wallet">
                Wallet
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigbar;

{
  /* <div className="header">
<nav className="navbar">
  <div className="hamburger" onClick={handleClick}>
    {click ? (
      <FaTimes size={30} style={{ color: "#ffffff" }} />
    ) : (
      <FaBars size={30} style={{ color: "#ffffff" }} />
    )}
  </div>
  <div className={click ? "nav-menu active" : "nav-menu "}>
    <li className="nav-item">
      <Link
        to="mynfts"
        spy={true}
        smooth={true}
        offset={-800}
        duration={500}
        onClick={closeMenu}
      >
        My NFTs
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="create"
        spy={true}
        smooth={true}
        offset={-40}
        duration={500}
        onClick={closeMenu}
      >
        Create Item
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="dash"
        spy={true}
        smooth={true}
        offset={-40}
        duration={500}
        onClick={closeMenu}
      >
        Creator Dashboard
      </Link>
    </li>
  </div>
</nav>
</div> */
}
