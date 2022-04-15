export const getAllUsers = (state) => {
  return state.usersPage.users;
};

export const getPageSize = (state) => {
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
