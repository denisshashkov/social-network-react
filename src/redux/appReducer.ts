import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getDataThunkCreator } from "./authReducer";
import { AppStateType, InferActionsTypes } from "./redux-store";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
const SHOW_ERROR = "SHOW_ERROR";

const initialState = {
  initialized: false,
  globalError: false,
};

export type InitialStateType = typeof initialState;

const appReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case SHOW_ERROR:
      return {
        ...state,
        globalError: action.globalError,
      };

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  initializeSuccessActionCreator: () =>
    ({
      type: INITIALIZED_SUCCESS,
    } as const),

  showErrorActionCreator: (globalError: boolean) =>
    ({
      type: SHOW_ERROR,
      globalError,
    } as const),
};

type ThunkTypes = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export type DispatchType = Dispatch<ActionsTypes>;

export const initializeSuccessThunkCreator = (): ThunkTypes => {
  return async (dispatch) => {
    let promise = dispatch(getDataThunkCreator());
    Promise.all([promise]).then(() =>
      dispatch(actions.initializeSuccessActionCreator())
    );
  };
};

export const globalErrorThunkCreator = (error: any): ThunkTypes => {
  return async (dispatch) => {
    let statusCode = error.reason.response.status;
    if (statusCode >= 400) {
      dispatch(actions.showErrorActionCreator(true));
      setTimeout(() => {
        dispatch(actions.showErrorActionCreator(false));
      }, 3000);
    }
  };
};

export default appReducer;
