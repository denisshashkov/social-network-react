import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../Forms/LoginForm";
import { setLoginThunkCreator } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";
import classes from "./login.module.scss";
import { getCaptcha, getIsAuth } from "./../../redux/authSelectors";

type PropsType = {};

const Login: React.FC<PropsType> = () => {
  const dispatch = useDispatch();
  const captcha = useSelector(getCaptcha);
  const isAuth = useSelector(getIsAuth);

  const submitHandler = (
    { email, password, rememberMe, captcha },
    submitProps: any
  ) => {
    dispatch(
      setLoginThunkCreator(
        email,
        password,
        rememberMe,
        submitProps.setStatus,
        captcha
      )
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

export default Login;
