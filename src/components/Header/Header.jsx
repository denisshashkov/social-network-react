import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "../UI/button/Button";
import classes from "./header.module.scss";

const Header = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(props.logOut());
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__left}>
        <h2 className={classes.header__title}>My Social Network</h2>
      </div>
      <div className={classes.header__right}>
        <NavLink to={"/login"} className={classes.header__link}>
          {props.isAuth ? (
            <div className={classes.header__login}>
              <b>{props.login}</b>
              <Button onClick={logoutHandler}>Logout</Button>
            </div>
          ) : (
            <Button>Login</Button>
          )}
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
