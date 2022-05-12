import { connect } from "react-redux";
import React from "react";
import LoginForm from "../Forms/LoginForm";
import { setLoginThunkCreator } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";
import classes from "./login.module.scss";

const Login = ({ isAuth, setLoginThunkCreator, captcha }) => {
  const submitHandler = (
    { email, password, rememberMe, captcha },
    submitProps
  ) => {
    setLoginThunkCreator(
      email,
      password,
      rememberMe,
      submitProps.setStatus,
      captcha
    );
  };

  if (isAuth) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <div className={classes.login}>
      <h1>Login</h1>
      <LoginForm submitHandler={submitHandler} captcha={captcha} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captcha: state.auth.captcha,
});

export default connect(mapStateToProps, { setLoginThunkCreator })(Login);
