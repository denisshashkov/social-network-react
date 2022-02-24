import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <ul className={classes.navbar__list}>
        <li className={classes.navbar__item}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? classes.active : classes.navbar__item
            }
          >
            Profile
          </NavLink>
        </li>
        <li className={classes.navbar__item}>
          <NavLink
            to="/dialogs"
            className={({ isActive }) =>
              isActive ? classes.active : classes.navbar__item
            }
          >
            Messages
          </NavLink>
        </li>
        <li className={classes.navbar__item}>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive ? classes.active : classes.navbar__item
            }
          >
            News
          </NavLink>
        </li>
        <li className={classes.navbar__item}>
          <NavLink
            to="/music"
            className={({ isActive }) =>
              isActive ? classes.active : classes.navbar__item
            }
          >
            Music
          </NavLink>
        </li>
        <li className={classes.navbar__item}>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? classes.active : classes.navbar__item
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
