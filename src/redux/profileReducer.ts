import { profileAPI } from "../api/api";
import {
  PostsType,
  ContactsType,
  PhotosType,
  FormDataType,
} from "../types/types";
const ADD_POST = "ADD-POST";
const GET_USER_PROFILE = "GET_USER_PROFILE";
const GET_PROFILE_STATUS = "GET_PROFILE_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SAVE_DATA_SUCCESS = "SAVE_DATA_SUCCESS";

type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  formData: FormDataType;
};

const initialState = {
  posts: [
    { id: 1, post: "how are you?", likeCount: 15 },
    { id: 2, post: "Hello!", likeCount: 24 },
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
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

type AddPostActionType = {
  type: typeof ADD_POST;
  post: string;
};

export const addPostActionCreator = (post: string): AddPostActionType => ({
  type: ADD_POST,
  post,
});

type GetUserProfileType = {
  type: typeof GET_USER_PROFILE;
  profile: ProfileType;
};

export const getUserProfile = (profile: ProfileType): GetUserProfileType => ({
  type: GET_USER_PROFILE,
  profile,
});

type GetProfileStatusActionType = {
  type: typeof GET_PROFILE_STATUS;
  status: string;
};

export const getProfileStatusActionCreator = (
  status: string
): GetProfileStatusActionType => ({
  type: GET_PROFILE_STATUS,
  status,
});

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};

export const savePhotoSuccessActionCreator = (
  photos: PhotosType
): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

type SaveDataSuccessActionType = {
  type: typeof SAVE_DATA_SUCCESS;
  formData: FormDataType;
};

export const saveDataSuccessActionCreator = (
  formData: FormDataType
): SaveDataSuccessActionType => ({
  type: SAVE_DATA_SUCCESS,
  formData,
});

export const getProfileThunkCreator = (userId: number) => {
  return async (dispatch: any) => {
    let data = await profileAPI.setUserProfile(userId);
    dispatch(getUserProfile(data));
  };
};
export const getProfileStatusThunkCreator = (userId: number) => {
  return async (dispatch: any) => {
    let data = await profileAPI.getUserProfileStatus(userId);
    dispatch(getProfileStatusActionCreator(data));
  };
};

export const updateProfileStatusThunkCreator = (status: string) => {
  return async (dispatch: any) => {
    let data = await profileAPI.updateUserProfileStatus(status);
    if (data.resultCode === 0) {
      dispatch(getProfileStatusActionCreator(status));
    }
  };
};

export const savePhotoThunkCreator = (file: any) => {
  return async (dispatch: any) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccessActionCreator(data.data.photos));
    }
  };
};

export const saveDataThunkCreator = (
  formData: FormDataType,
  setStatus: any
) => {
  return async (dispatch: any, getState: any) => {
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
