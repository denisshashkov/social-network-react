/* eslint-disable no-undef */
import React from "react";
import Header from "./Header";
import { setLogoutThunkCreator } from "../../redux/authReducer.ts";
import { getIsAuth, getLogin } from "../../redux/authSelectors";
import { useSelector } from "react-redux";

const HeaderContainer = () => {
  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);

  return (
    <Header logOut={setLogoutThunkCreator} isAuth={isAuth} login={login} />
  );
};

export default HeaderContainer;
