import React from "react";

import Logo from "../images/netflix-logo.png";
import "./Header.css";

const Header = ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img src={Logo} alt="netflix-logo" />
        </a>
      </div>

      <div className="header--user">
        <img
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
          alt="user"
        />
      </div>
    </header>
  );
};

export default Header;
