import { AppStateType } from "./redux-store";

export const getProfile = (state: AppStateType) => {
  return state.profilePage.profile;
};

export const getStatus = (state: AppStateType) => {
  return state.profilePage.status;
};

export const getAuthorizedUserId = (state: AppStateType) => {
  return state.auth.id;
};

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};

export const getPosts = (state: AppStateType) => {
  return state.profilePage.posts;
};
