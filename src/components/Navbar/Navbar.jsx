import React from "react";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaUsers, FaMusic } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { GiNewspaper } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
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
            <div className={classes.navbar__label}>
              <div className={classes.navbar__icon}>
                <CgProfile />
              </div>
              <span>Profile</span>
            </div>
          </NavLink>
        </li>
        <li className={classes.navbar__item}>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive ? classes.active : classes.navbar__item
            }
          >
            <div className={classes.navbar__label}>
              <div className={classes.navbar__icon}>
                <FaUsers />
              </div>
              <span>Users</span>
            </div>
          </NavLink>
        </li>

        <li className={classes.navbar__item}>
          <NavLink
            to="/dialogs"
            className={({ isActive }) =>
              isActive ? classes.active : classes.navbar__item
            }
          >
            <div className={classes.navbar__label}>
              <div className={classes.navbar__icon}>
                <TiMessages />
              </div>
              <span>Messages</span>
            </div>
          </NavLink>
        </li>
        <li className={classes.navbar__item}>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive ? classes.active : classes.navbar__item
            }
          >
            <div className={classes.navbar__label}>
              <div className={classes.navbar__icon}>
                <GiNewspaper />
              </div>
              <span>News</span>
            </div>
          </NavLink>
        </li>
        <li className={classes.navbar__item}>
          <NavLink
            to="/music"
            className={({ isActive }) =>
              isActive ? classes.active : classes.navbar__item
            }
          >
            <div className={classes.navbar__label}>
              <div className={classes.navbar__icon}>
                <FaMusic />
              </div>
              <span>Music</span>
            </div>
          </NavLink>
        </li>
        <li className={classes.navbar__item}>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? classes.active : classes.navbar__item
            }
          >
            <div className={classes.navbar__label}>
              <div className={classes.navbar__icon}>
                <FiSettings />
              </div>
              <span>Settings</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
