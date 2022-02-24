import React from "react";
import classes from "./header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <div>
        <img
          className={classes.header__logo}
          src="https://st.depositphotos.com/1364916/3494/v/950/depositphotos_34947665-stock-illustration-happy-business-friends-logo-vector.jpg"
          alt=""
        />
      </div>
      <h1 className={classes.header__title}>My Social Network</h1>
    </header>
  );
};

export default Header;
