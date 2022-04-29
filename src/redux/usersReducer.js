import { userAPI, followAPI } from "../api/api";
import { updateObjectInArray } from "../utils/helpers";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const GET_USERS = "GET_USERS";
const GET_CURRENT_PAGE = "GET_CURRENT_PAGE";
const GET_USERS_COUNT = "GET_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const DISABLED_BUTTON = "DISABLED_BUTTTON";

const initialState = {
  users: [],
  pageSize: 3,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case GET_USERS:
      return { ...state, users: action.users };
    case GET_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case GET_USERS_COUNT:
      return { ...state, totalUsersCount: action.usersCount };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case DISABLED_BUTTON:
      return {
        ...state,
        followingProgress: action.isFetching
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unFollow = (userId) => ({
  type: UNFOLLOW,
  userId,
});
export const getUsers = (users) => ({
  type: GET_USERS,
  users,
});
export const getCurrentPage = (page) => ({
  type: GET_CURRENT_PAGE,
  page,
});
export const getUsersCount = (usersCount) => ({
  type: GET_USERS_COUNT,
  usersCount,
});
export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const disabledButton = (isFetching, userId) => ({
  type: DISABLED_BUTTON,
  isFetching,
  userId,
});

export const getUsersThunkCreator = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(getCurrentPage(currentPage));
    dispatch(toggleIsFetching(true));
    let data = await userAPI.setUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(getUsers(data.items));
    dispatch(getUsersCount(data.totalCount));
  };
};

const followUnfollow = async (dispatch, user, apiMethod, actionCreator) => {
  dispatch(disabledButton(true, user.id));
  let data = await apiMethod(user);
  if (data.resultCode === 0) {
    dispatch(actionCreator(user.id));
  }
  dispatch(disabledButton(false, user.id));
};

export const unFollowThunkCreator = (user) => {
  return async (dispatch) => {
    let apiMethod = followAPI.unFollowUser.bind(userAPI);
    followUnfollow(dispatch, user, apiMethod, unFollow);
  };
};

export const followThunkCreator = (user) => {
  return async (dispatch) => {
    let apiMethod = followAPI.followUser.bind(userAPI);
    followUnfollow(dispatch, user, apiMethod, follow);
  };
};

export default usersReducer;
