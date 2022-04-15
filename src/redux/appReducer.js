import { getDataThunkCreator } from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializeSuccessActionCreator = () => ({
  type: INITIALIZED_SUCCESS,
});

export const initializeSuccessThunkCreator = () => (dispatch) => {
  dispatch(getDataThunkCreator()).then(() =>
    dispatch(initializeSuccessActionCreator())
  );
};

export default appReducer;
