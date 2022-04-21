import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "1005389b-3669-4168-927a-73c7e59eb3e6",
  },
});

export const userAPI = {
  setUsers(currentPage = 1, pageSize = 5) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`, {})
      .then((response) => response.data);
  },
};

export const profileAPI = {
  setUserProfile(userId) {
    return instance
      .get(`profile/${userId}`, {})
      .then((response) => response.data);
  },
  getUserProfileStatus(userId) {
    return instance
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateUserProfileStatus(status) {
    return instance
      .put(`profile/status`, { status: status })
      .then((response) => response.data);
  },
  savePhoto(photo) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance
      .put(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  saveData(formData) {
    return instance.put(`profile`, formData).then((response) => response.data);
  },
};

export const authAPI = {
  getUserData() {
    return instance.get(`auth/me`, {}).then((response) => response.data);
  },
  setLogin(email, password, rememberMe, captcha) {
    return instance
      .post(`auth/login`, { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  setLogout() {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
};

export const followAPI = {
  unFollowUser(user) {
    return instance
      .delete(`follow/${user.id}`, {})
      .then((response) => response.data);
  },
  followUser(user) {
    return instance
      .post(`follow/${user.id}`, {})
      .then((response) => response.data);
  },
};

export const securityAPI = {
  getCaptcha() {
    return instance
      .get("security/get-captcha-url")
      .then((response) => response.data);
  },
};
