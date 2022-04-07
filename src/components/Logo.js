import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <Link className="logolink" to="/">
        Encanto
      </Link>
    </div>
  );
};

export default Logo;
