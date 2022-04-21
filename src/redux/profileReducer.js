import { profileAPI } from "../api/api";
const ADD_POST = "ADD-POST";
const GET_USER_PROFILE = "GET_USER_PROFILE";
const GET_PROFILE_STATUS = "GET_PROFILE_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SAVE_DATA_SUCCESS = "SAVE_DATA_SUCCESS";

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
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }
    case SAVE_DATA_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, formData: action.formData },
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

export const savePhotoSuccessActionCreator = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const saveDataSuccessActionCreator = (formData) => ({
  type: SAVE_DATA_SUCCESS,
  formData,
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

export const savePhotoThunkCreator = (file) => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccessActionCreator(data.data.photos));
    }
  };
};

export const saveDataThunkCreator = (formData, setStatus) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.id;
    let data = await profileAPI.saveData(formData);

    if (data.resultCode === 0) {
      dispatch(getProfileThunkCreator(userId));
    } else {
      let serverErrorMessage =
        data.messages.length > 0 ? data.messages : "Some Error";
      setStatus({ error: serverErrorMessage });
    }
  };
};

export default profileReducer;
