import { profileAPI, ResultCodesEnum } from "../api/api";
import {
  PostsType,
  ContactsType,
  PhotosType,
  FormDataType,
} from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";
const ADD_POST = "ADD-POST";
const GET_USER_PROFILE = "GET_USER_PROFILE";
const GET_PROFILE_STATUS = "GET_PROFILE_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SAVE_DATA_SUCCESS = "SAVE_DATA_SUCCESS";

export type ProfileType = {
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

type ActionsTypes =
  | AddPostActionType
  | GetUserProfileType
  | GetProfileStatusActionType
  | SavePhotoSuccessActionType
  | SaveDataSuccessActionType;

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

export const setUserProfile = (profile: ProfileType): GetUserProfileType => ({
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

type ThunkTypes = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getProfileThunkCreator = (userId: number): ThunkTypes => {
  return async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId);
    dispatch(setUserProfile(data));
  };
};
export const getProfileStatusThunkCreator = (userId: number): ThunkTypes => {
  return async (dispatch) => {
    let data = await profileAPI.getUserProfileStatus(userId);
    dispatch(getProfileStatusActionCreator(data));
  };
};

export const updateProfileStatusThunkCreator = (status: string): ThunkTypes => {
  return async (dispatch) => {
    let data = await profileAPI.updateUserProfileStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getProfileStatusActionCreator(status));
    }
  };
};

type fileType = {
  name: string;
  size: number;
  type: string;
};

export const savePhotoThunkCreator = (file: fileType): ThunkTypes => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccessActionCreator(data.data.photos));
    }
  };
};

export const saveDataThunkCreator = (
  formData: FormDataType,
  setStatus: (status?: any) => void
): ThunkTypes => {
  return async (dispatch, getState) => {
    const userId = getState().auth.id;
    let data = await profileAPI.saveData(formData);

    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getProfileThunkCreator(userId));
    } else {
      let serverErrorMessage =
        data.messages.length > 0 ? data.messages : "Some Error";
      setStatus({ error: serverErrorMessage });
    }
  };
};

export default profileReducer;
