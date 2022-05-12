import axios from "axios";
import { ProfileType } from "redux/profileReducer";
import { FormDataType, PhotosType, UsersType } from "types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "1005389b-3669-4168-927a-73c7e59eb3e6",
  },
});

type UsersResponseType = {
  items: Array<UsersType>;
  totalCount: number;
  error: string;
};

export const userAPI = {
  setUsers(currentPage = 1, pageSize = 5) {
    return instance
      .get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
};

type UpdateStatusResponseType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: { status: string };
};

type SavePhotoResponseType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: { photos: PhotosType };
};

type SaveDataResponseType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: ProfileType;
};

export const profileAPI = {
  getUserProfile(userId: number) {
    return instance
      .get<ProfileType>(`profile/${userId}`)
      .then((response) => response.data);
  },
  getUserProfileStatus(userId: number) {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateUserProfileStatus(status: string) {
    return instance
      .put<UpdateStatusResponseType>(`profile/status`, { status: status })
      .then((response) => response.data);
  },
  savePhoto(photo: any) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance
      .put<SavePhotoResponseType>(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  saveData(formData: FormDataType) {
    return instance
      .put<SaveDataResponseType>(`profile`, formData)
      .then((response) => response.data);
  },
};

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

type MeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

type LoginResponseType = {
  data: { id: number };
  resultCode: ResultCodesEnum | ResultCodeForCaptcha;
  messages: Array<string>;
};

export const authAPI = {
  getUserData() {
    return instance
      .get<MeResponseType>(`auth/me`)
      .then((response) => response.data);
  },
  setLogin(
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: null | string = null
  ) {
    return instance
      .post<LoginResponseType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data);
  },
  setLogout() {
    return instance
      .delete<LoginResponseType>(`auth/login`)
      .then((response) => response.data);
  },
};

type FollowUnFollowResponseType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: { id: number };
};

export const followAPI = {
  unFollowUser(user: UsersType) {
    return instance
      .delete<FollowUnFollowResponseType>(`follow/${user.id}`)
      .then((response) => response.data);
  },
  followUser(user: UsersType) {
    return instance
      .post<FollowUnFollowResponseType>(`follow/${user.id}`, {})
      .then((response) => response.data);
  },
};

type SecurityResponseType = {
  url: string;
};

export const securityAPI = {
  getCaptcha() {
    return instance
      .get<SecurityResponseType>("security/get-captcha-url")
      .then((response) => response.data);
  },
};
