export type PostsType = {
  id: number;
  post: string;
  likeCount: number;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  formData: FormDataType;
  aboutMe: string;
};

export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type FormDataType = {
  aboutMe: string | null;
  fullName: string | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
};

export type UsersType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

export type DialogsDataType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  message: string;
};

export type messagesPageType = {
  dialogsData: Array<DialogsDataType>;
  messages: Array<MessageType>;
};
