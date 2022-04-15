import { authAPI } from "../api/api";
const SET_USER_DATA = "SET_USER_DATA";
const SET_LOGIN = "SET_LOGIN";

const initialState = {
  id: null,
  email: null,
  login: null,
  password: "",
  rememberMe: false,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_LOGIN:
      return {
        ...state,
        login: action.login,
        password: action.password,
        rememberMe: action.rememberMe,
      };

    default:
      return state;
  }
};

export const setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_USER_DATA,
  data: { id, email, login, isAuth },
});

export const setLoginActionCreator = (
  login,
  password,
  captcha,
  rememberMe
) => ({
  type: SET_LOGIN,
  data: { login, password, captcha, rememberMe },
});

export const getDataThunkCreator = () => {
  return async (dispatch) => {
    let data = await authAPI.getUserData();
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  };
};

export const setLoginThunkCreator = (
  email,
  password,
  rememberMe,
  setStatus
) => {
  return async (dispatch) => {
    let data = await authAPI.setLogin(email, password, rememberMe);
    if (data.resultCode === 0) {
      dispatch(getDataThunkCreator());
    } else {
      let serverErrorMessage =
        data.messages.length > 0 ? data.messages : "Some Error";
      setStatus({ error: serverErrorMessage });
    }
  };
};

export const setLogoutThunkCreator = () => {
  return async (dispatch) => {
    let data = await authAPI.setLogout();
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  };
};

export default authReducer;
