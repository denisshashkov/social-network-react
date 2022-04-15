import { connect } from "react-redux";
import React from "react";
import LoginForm from "../Forms/LoginForm";
import { setLoginThunkCreator } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";

const Login = ({ isAuth, setLoginThunkCreator }) => {
  const submitHandler = ({ email, password, rememberMe }, submitProps) => {
    setLoginThunkCreator(email, password, rememberMe, submitProps.setStatus);
  };

  if (isAuth) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm submitHandler={submitHandler} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { setLoginThunkCreator })(Login);
