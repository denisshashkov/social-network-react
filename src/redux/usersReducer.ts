import {
  userAPI,
  followUnfollowAPI,
  ResultCodesEnum,
  ResponseType,
} from "../api/api";
import { updateObjectInArray } from "../utils/helpers";
import { UsersType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const GET_USERS = "GET_USERS";
const GET_CURRENT_PAGE = "GET_CURRENT_PAGE";
const GET_USERS_COUNT = "GET_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const DISABLED_BUTTON = "DISABLED_BUTTTON";
const SET_FILTER = "SET_FILTER";

const initialState = {
  users: [] as Array<UsersType>,
  pageSize: 3 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: true,
  followingProgress: [] as Array<number>, // array of users id,
  filter: {
    term: "",
    friend: null as null | boolean,
  },
};

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
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
    case SET_FILTER:
      return { ...state, filter: action.payload };
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

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  follow: (userId: number) =>
    ({
      type: FOLLOW,
      userId,
    } as const),

  unFollow: (userId: number) =>
    ({
      type: UNFOLLOW,
      userId,
    } as const),

  getUsers: (users: Array<UsersType>) =>
    ({
      type: GET_USERS,
      users,
    } as const),

  getCurrentPage: (page: number) =>
    ({
      type: GET_CURRENT_PAGE,
      page,
    } as const),

  setFilter: (filter: FilterType) =>
    ({
      type: SET_FILTER,
      payload: filter,
    } as const),

  getUsersCount: (usersCount: number) =>
    ({
      type: GET_USERS_COUNT,
      usersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: TOGGLE_IS_FETCHING,
      isFetching,
    } as const),

  disabledButton: (isFetching: boolean, userId: number) =>
    ({
      type: DISABLED_BUTTON,
      isFetching,
      userId,
    } as const),
};

type ThunkTypes = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export type DispatchType = Dispatch<ActionsTypes>;

export const getUsersThunkCreator = (
  currentPage: number,
  pageSize: number,
  filter: FilterType
): ThunkTypes => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.getCurrentPage(currentPage));
    dispatch(actions.setFilter(filter));
    let data = await userAPI.setUsers(
      currentPage,
      pageSize,
      filter.term,
      filter.friend
    );
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.getUsers(data.items));
    dispatch(actions.getUsersCount(data.totalCount));
  };
};

const _followUnfollow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: (userId: number) => Promise<ResponseType>,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.disabledButton(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.disabledButton(false, userId));
};

export const unFollowThunkCreator = (userId: number): ThunkTypes => {
  return async (dispatch) => {
    let apiMethod = followUnfollowAPI.unFollowUser.bind(userAPI);
    await _followUnfollow(dispatch, userId, apiMethod, actions.unFollow);
  };
};

export const followThunkCreator = (userId: number): ThunkTypes => {
  return async (dispatch) => {
    let apiMethod = followUnfollowAPI.followUser.bind(userAPI);
    await _followUnfollow(dispatch, userId, apiMethod, actions.follow);
  };
};

export default usersReducer;
