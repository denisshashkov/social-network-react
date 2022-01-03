import React from "react";
import classes from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <ul className={classes.navbar__list}>
        <li className={classes.navbar__item}>
          <a href="#">Profile</a>
        </li>
        <li className={classes.navbar__item}>
          <a href="#">Messages</a>
        </li>
        <li className={classes.navbar__item}>
          <a href="#">News</a>
        </li>
        <li className={classes.navbar__item}>
          <a href="#">Music</a>
        </li>
        <li className={classes.navbar__item}>
          <a href="#">Settings</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
