import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./header.module.scss";

const Header = (props) => {
  const logoutHandler = () => {
    props.setLogoutThunkCreator();
  };

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
      <div className={classes.header__login}>
        <NavLink to={"/login"}>
          {props.isAuth ? (
            <div>
              <h3>{props.login}</h3>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          ) : (
            <h3>Login</h3>
          )}
        </NavLink>
        <h2>{props.email}</h2>
      </div>
    </header>
  );
};

export default Header;