import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <p>
        This site is powered by &nbsp;
        <a href="https://www.themoviedb.org/">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="TMDB-logo"
          />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
