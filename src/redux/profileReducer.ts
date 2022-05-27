import { profileAPI, ResultCodesEnum } from "../api/api";
import {
  PostsType,
  PhotosType,
  FormDataType,
  ProfileType,
} from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";
const ADD_POST = "ADD-POST";
const GET_USER_PROFILE = "GET_USER_PROFILE";
const GET_PROFILE_STATUS = "GET_PROFILE_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SAVE_DATA_SUCCESS = "SAVE_DATA_SUCCESS";

const initialState = {
  posts: [] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: ActionsTypes
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

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  addPostActionCreator: (post: PostsType) =>
    ({
      type: ADD_POST,
      post,
    } as const),

  setUserProfile: (profile: ProfileType) =>
    ({
      type: GET_USER_PROFILE,
      profile,
    } as const),

  getProfileStatusActionCreator: (status: string) =>
    ({
      type: GET_PROFILE_STATUS,
      status,
    } as const),

  savePhotoSuccessActionCreator: (photos: PhotosType) =>
    ({
      type: SAVE_PHOTO_SUCCESS,
      photos,
    } as const),

  saveDataSuccessActionCreator: (formData: FormDataType) =>
    ({
      type: SAVE_DATA_SUCCESS,
      formData,
    } as const),
};

type ThunkTypes = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getProfileThunkCreator = (userId: number): ThunkTypes => {
  return async (dispatch) => {
    let data = await profileAPI.getUserProfile(userId);
    dispatch(actions.setUserProfile(data));
  };
};
export const getProfileStatusThunkCreator = (userId: number): ThunkTypes => {
  return async (dispatch) => {
    let data = await profileAPI.getUserProfileStatus(userId);
    dispatch(actions.getProfileStatusActionCreator(data));
  };
};

export const updateProfileStatusThunkCreator = (status: string): ThunkTypes => {
  return async (dispatch) => {
    let data = await profileAPI.updateUserProfileStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.getProfileStatusActionCreator(status));
    }
  };
};

export const savePhotoThunkCreator = (file: File): ThunkTypes => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccessActionCreator(data.data.photos));
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
