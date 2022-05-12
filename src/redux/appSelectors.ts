import { AppStateType } from "./redux-store";

export const getGlobalError = (state: AppStateType) => {
  return state.app.globalError;
};

export const getInitialized = (state: AppStateType) => {
  return state.app.initialized;
};
