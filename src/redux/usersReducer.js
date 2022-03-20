const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const GET_USERS = "GET_USERS";
const GET_CURRENT_PAGE = "GET_CURRENT_PAGE";
const GET_USERS_COUNT = "GET_USERS_COUNT";

const initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.userId ? { ...user, followed: true } : user
        ),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.userId ? { ...user, followed: false } : user
        ),
      };
    case GET_USERS:
      return { ...state, users: action.users };
    case GET_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case GET_USERS_COUNT:
      return { ...state, totalUsersCount: action.usersCount };
    default:
      return state;
  }
};

export const followActionCreator = (userId) => ({ type: FOLLOW, userId });
export const unfollowActionCreator = (userId) => ({
  type: UNFOLLOW,
  userId,
});
export const getUsersActionCreator = (users) => ({
  type: GET_USERS,
  users,
});
export const getCurrentPageActionCreator = (page) => ({
  type: GET_CURRENT_PAGE,
  page,
});
export const getUsersCountCreator = (usersCount) => ({
  type: GET_USERS_COUNT,
  usersCount,
});

export default usersReducer;
