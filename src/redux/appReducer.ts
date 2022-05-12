import { ThunkAction } from "redux-thunk";
import { getDataThunkCreator } from "./authReducer";
import { AppStateType } from "./redux-store";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
const GLOBAL_ERROR = "GLOBAL_ERROR";

export type InitialStateType = {
  initialized: Boolean;
  globalError: Boolean;
};

const initialState: InitialStateType = {
  initialized: false,
  globalError: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case GLOBAL_ERROR:
      return {
        ...state,
        globalError: action.globalError,
      };
    default:
      return state;
  }
};

type ActionsTypes = InitializeSuccessActionType | ErrorActionType;

type InitializeSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

export const initializeSuccessActionCreator =
  (): InitializeSuccessActionType => ({
    type: INITIALIZED_SUCCESS,
  });

type ErrorActionType = {
  type: typeof GLOBAL_ERROR;
  globalError: Boolean;
};

export const showErrorActionCreator = (): ErrorActionType => ({
  type: GLOBAL_ERROR,
  globalError: true,
});

export const hideErrorActionCreator = (): ErrorActionType => ({
  type: GLOBAL_ERROR,
  globalError: false,
});

type ThunkTypes = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const initializeSuccessThunkCreator = (): ThunkTypes => {
  return async (dispatch) => {
    let promise = dispatch(getDataThunkCreator());
    Promise.all([promise]).then(() =>
      dispatch(initializeSuccessActionCreator())
    );
  };
};

export const globalErrorThunkCreator = (error: any): ThunkTypes => {
  return async (dispatch) => {
    let statusCode = error.reason.response.status;
    if (statusCode >= 400) {
      dispatch(showErrorActionCreator());
      setTimeout(() => {
        dispatch(hideErrorActionCreator());
      }, 3000);
    }
  };
};

export default appReducer;
