import { getDataThunkCreator } from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
const GLOBAL_ERROR = "GLOBAL_ERROR";

const initialState = {
  initialized: false,
  globalError: false,
};

const appReducer = (state = initialState, action) => {
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

export const initializeSuccessActionCreator = () => ({
  type: INITIALIZED_SUCCESS,
});

export const showErrorActionCreator = () => ({
  type: GLOBAL_ERROR,
  globalError: true,
});

export const hideErrorActionCreator = () => ({
  type: GLOBAL_ERROR,
  globalError: false,
});

export const initializeSuccessThunkCreator = () => (dispatch) => {
  dispatch(getDataThunkCreator()).then(() =>
    dispatch(initializeSuccessActionCreator())
  );
};

export const globalErrorThunkCreator = (error) => (dispatch) => {
  let statusCode = error.reason.response.status;
  if (statusCode >= 400) {
    dispatch(showErrorActionCreator());
    setTimeout(() => {
      dispatch(hideErrorActionCreator());
    }, 3000);
  }
};

export default appReducer;
