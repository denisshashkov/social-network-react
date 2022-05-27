import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "../UI/button/Button";
import { setLogoutThunkCreator } from "../../redux/authReducer";
import { getIsAuth, getLogin } from "../../redux/authSelectors";
import { useSelector } from "react-redux";
import classes from "./header.module.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);
  const logoutHandler = () => {
    dispatch(setLogoutThunkCreator());
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__left}>
        <h2 className={classes.header__title}>My Social Network</h2>
      </div>
      <div className={classes.header__right}>
        <NavLink to={"/login"} className={classes.header__link}>
          {isAuth ? (
            <div className={classes.header__login}>
              <b>{login}</b>
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
