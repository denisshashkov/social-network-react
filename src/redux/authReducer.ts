import { ThunkAction } from "redux-thunk";
import {
  authAPI,
  ResultCodeForCaptcha,
  ResultCodesEnum,
  securityAPI,
} from "../api/api";
import { AppStateType, InferActionsTypes } from "./redux-store";
const SET_USER_DATA = "SET_USER_DATA";
const SET_LOGIN = "SET_LOGIN";
const GET_CAPTCHA = "GET_CAPTCHA";

const initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  rememberMe: false,
  isAuth: false,
  captcha: null as string | null,
};

export type InitialStateType = typeof initialState;

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SET_LOGIN:
      return {
        ...state,
        login: action.data.login,
        rememberMe: action.data.rememberMe,
      };
    case GET_CAPTCHA:
      return {
        ...state,
        ...action.payLoad,
      };

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
  setAuthUserData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: SET_USER_DATA,
      data: { id, email, login, isAuth },
    } as const),

  getCaptchaActionCreator: (captcha: string) =>
    ({
      type: GET_CAPTCHA,
      payLoad: { captcha },
    } as const),

  setLoginActionCreator: (
    login: string,
    password: string,
    captcha: string,
    rememberMe: boolean
  ) =>
    ({
      type: SET_LOGIN,
      data: { login, password, captcha, rememberMe },
    } as const),
};

type ThunkTypes = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getDataThunkCreator = (): ThunkTypes => {
  return async (dispatch) => {
    let data = await authAPI.getUserData();
    if (data.resultCode === ResultCodesEnum.Success) {
      let { id, email, login } = data.data;
      dispatch(actions.setAuthUserData(id, email, login, true));
    }
  };
};

export const setLoginThunkCreator = (
  email: string,
  password: string,
  rememberMe: boolean,
  setStatus: any,
  captcha: string
): ThunkTypes => {
  return async (dispatch) => {
    let data = await authAPI.setLogin(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getDataThunkCreator());
    } else {
      if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaThunkCreator());
      }
      let serverErrorMessage =
        data.messages.length > 0 ? data.messages : "Some Error";
      setStatus({ error: serverErrorMessage });
    }
  };
};

export const setLogoutThunkCreator = (): ThunkTypes => {
  return async (dispatch) => {
    let data = await authAPI.setLogout();
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setAuthUserData(null, null, null, false));
    }
  };
};

export const getCaptchaThunkCreator = (): ThunkTypes => {
  return async (dispatch) => {
    let data = await securityAPI.getCaptcha();
    const captcha = data.url;
    dispatch(actions.getCaptchaActionCreator(captcha));
  };
};

export default authReducer;
