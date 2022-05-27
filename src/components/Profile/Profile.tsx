import React from "react";
import { ProfileType } from "types/types";
import MyPosts from "../MyPosts/MyPosts";
import classes from "./profile.module.scss";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export type PropsType = {
  profile: ProfileType;
  status: string;
  owner: boolean;
  updateStatus: (newStatus: string) => void;
  savePhoto: (file: File) => void;
  saveData: (formData: ProfileType, setStatus: any) => void;
};

const Profile: React.FC<PropsType> = ({
  profile,
  status,
  updateStatus,
  owner,
  savePhoto,
  saveData,
}) => {
  return (
    <main className={classes.profile}>
      <div className={classes.profile__cover}>
        <ProfileInfo
          profile={profile}
          status={status}
          updateStatus={updateStatus}
          owner={owner}
          savePhoto={savePhoto}
          saveData={saveData}
        />
      </div>
      <MyPosts />
    </main>
  );
};

export default Profile;
