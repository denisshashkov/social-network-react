import axios from "axios";
import { ProfileType } from "../types/types";
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

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  messages: Array<string>;
  data: D;
  resultCode: RC;
};

type SavePhotoResponseType = {
  photos: PhotosType;
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
      .put<ResponseType>(`profile/status`, {
        status: status,
      })
      .then((response) => response.data);
  },
  savePhoto(photo: File) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance
      .put<ResponseType<SavePhotoResponseType>>(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  saveData(formData: FormDataType) {
    return instance
      .put<ResponseType<ProfileType>>(`profile`, formData)
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
  id: number;
  email: string;
  login: string;
};

type LoginResponseType = {
  id: number;
};

export const authAPI = {
  getUserData() {
    return instance
      .get<ResponseType<MeResponseType>>(`auth/me`)
      .then((response) => response.data);
  },
  setLogin(
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: null | string = null
  ) {
    return instance
      .post<
        ResponseType<LoginResponseType, ResultCodesEnum | ResultCodeForCaptcha>
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data);
  },
  setLogout() {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
};

export const followUnfollowAPI = {
  unFollowUser(userId: number) {
    return instance
      .delete<ResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
  followUser(userId: number) {
    return instance
      .post<ResponseType>(`follow/${userId}`, {})
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
