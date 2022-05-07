import { userAPI, followAPI } from "../api/api";
import { updateObjectInArray } from "../utils/helpers";
import { UsersType } from "../types/types";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const GET_USERS = "GET_USERS";
const GET_CURRENT_PAGE = "GET_CURRENT_PAGE";
const GET_USERS_COUNT = "GET_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const DISABLED_BUTTON = "DISABLED_BUTTTON";

const initialState = {
  users: [] as Array<UsersType>,
  pageSize: 3 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: true,
  followingProgress: [] as Array<number>, // array of users id,
};

export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialStateType => {
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

type FollowActionType = {
  type: typeof FOLLOW;
  userId: number;
};

export const follow = (userId: number): FollowActionType => ({
  type: FOLLOW,
  userId,
});

type UnFollowActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};

export const unFollow = (userId: number): UnFollowActionType => ({
  type: UNFOLLOW,
  userId,
});

type GetUsersActionType = {
  type: typeof GET_USERS;
  users: Array<UsersType>;
};

export const getUsers = (users: Array<UsersType>): GetUsersActionType => ({
  type: GET_USERS,
  users,
});

type GetCurrentPageActionType = {
  type: typeof GET_CURRENT_PAGE;
  page: number;
};

export const getCurrentPage = (page: number): GetCurrentPageActionType => ({
  type: GET_CURRENT_PAGE,
  page,
});

type GetUsersCountActionType = {
  type: typeof GET_USERS_COUNT;
  usersCount: number;
};

export const getUsersCount = (usersCount: number): GetUsersCountActionType => ({
  type: GET_USERS_COUNT,
  usersCount,
});

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type DisabledButtonActionType = {
  type: typeof DISABLED_BUTTON;
  isFetching: boolean;
  userId: number;
};

export const disabledButton = (
  isFetching: boolean,
  userId: number
): DisabledButtonActionType => ({
  type: DISABLED_BUTTON,
  isFetching,
  userId,
});

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(getCurrentPage(currentPage));
    dispatch(toggleIsFetching(true));
    let data = await userAPI.setUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(getUsers(data.items));
    dispatch(getUsersCount(data.totalCount));
  };
};

const followUnfollow = async (
  dispatch: any,
  user: UsersType,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(disabledButton(true, user.id));
  let data = await apiMethod(user);
  if (data.resultCode === 0) {
    dispatch(actionCreator(user.id));
  }
  dispatch(disabledButton(false, user.id));
};

export const unFollowThunkCreator = (user: UsersType) => {
  return async (dispatch: any) => {
    let apiMethod = followAPI.unFollowUser.bind(userAPI);
    followUnfollow(dispatch, user, apiMethod, unFollow);
  };
};

export const followThunkCreator = (user: UsersType) => {
  return async (dispatch: any) => {
    let apiMethod = followAPI.followUser.bind(userAPI);
    followUnfollow(dispatch, user, apiMethod, follow);
  };
};

export default usersReducer;
