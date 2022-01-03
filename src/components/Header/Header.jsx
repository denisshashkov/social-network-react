import React from "react";
import classes from "./header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <img
        className={classes.header__logo}
        src="https://cdn.logo.com/hotlink-ok/logo-social.png"
        alt=""
      />
      <h1 className={classes.header__title}>My Social Network</h1>
    </header>
  );
};

export default Header;
