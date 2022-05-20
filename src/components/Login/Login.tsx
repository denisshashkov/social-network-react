import { connect } from "react-redux";
import LoginForm from "../Forms/LoginForm";
import { setLoginThunkCreator } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";
import classes from "./login.module.scss";
import { AppStateType } from "redux/redux-store";

type PropsType = {
  isAuth: boolean;
  captcha: string | null;
  setLoginThunkCreator: (
    email: string,
    password: string,
    rememberMe: boolean,
    submitProps: any,
    captcha: string
  ) => void;
};

const Login: React.FC<PropsType> = ({
  isAuth,
  setLoginThunkCreator,
  captcha,
}) => {
  const submitHandler = (
    { email, password, rememberMe, captcha },
    submitProps: any
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

type MapStateToPropsType = {
  isAuth: boolean;
  captcha: string | null;
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captcha: state.auth.captcha,
});

export default connect(mapStateToProps, { setLoginThunkCreator })(Login);
