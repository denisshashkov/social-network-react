import { profileAPI } from "../api/api";
const ADD_POST = "ADD-POST";
const GET_USER_PROFILE = "GET_USER_PROFILE";
const GET_PROFILE_STATUS = "GET_PROFILE_STATUS";

const initialState = {
  posts: [
    { id: 1, post: "how are you?", likeCount: 15 },
    { id: 2, post: "Hello!", likeCount: 24 },
  ],

  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [...state.posts, action.post],
      };
    }

    case GET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case GET_PROFILE_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (post) => ({ type: ADD_POST, post });

export const getUserProfile = (profile) => ({
  type: GET_USER_PROFILE,
  profile,
});

export const getProfileStatusActionCreator = (status) => ({
  type: GET_PROFILE_STATUS,
  status,
});

export const getProfileThunkCreator = (userId) => {
  return async (dispatch) => {
    let data = await profileAPI.setUserProfile(userId);
    dispatch(getUserProfile(data));
  };
};
export const getProfileStatusThunkCreator = (userId) => {
  return async (dispatch) => {
    let data = await profileAPI.getUserProfileStatus(userId);
    dispatch(getProfileStatusActionCreator(data));
  };
};

export const updateProfileStatusThunkCreator = (status) => {
  return async (dispatch) => {
    let data = await profileAPI.updateUserProfileStatus(status);
    if (data.resultCode === 0) {
      dispatch(getProfileStatusActionCreator(status));
    }
  };
};

export default profileReducer;
