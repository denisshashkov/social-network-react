import { AppStateType } from "./redux-store";

export const getAllUsers = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getFollowingProgress = (state) => {
  return state.usersPage.followingProgress;
};

export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
};

export const getTotalUserCount = (state) => {
  return state.usersPage.totalUsersCount;
};

export const getPage = (state) => {
  return state.usersPage.currentPage;
};
