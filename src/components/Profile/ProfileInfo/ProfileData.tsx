import React from "react";
import { ProfileType } from "types/types";
import Button from "../../UI/button/Button";
import classes from "./profileInfo.module.scss";

type PropsType = {
  profile: ProfileType;
  owner: boolean;
  editModeHandler: () => void;
};

const ProfileData: React.FC<PropsType> = ({
  profile,
  owner,
  editModeHandler,
}) => {
  const activateEditMode = () => {
    editModeHandler();
  };
  return (
    <div>
      <div className={classes.profile__data__item}>
        <b>Full Name: {profile.fullName}</b>
      </div>
      <div className={classes.profile__data__item}>
        <b>Looking for a job: {profile.lookingForAJob ? "Yes" : "No"}</b>
      </div>
      <div className={classes.profile__data__item}>
        <b>About me: {profile.aboutMe}</b>
      </div>
      <div className={classes.profile__data__item}>
        {profile.lookingForAJob && (
          <b>Skills: {profile.lookingForAJobDescription}</b>
        )}
      </div>
      {owner && <Button onClick={activateEditMode}>Edit</Button>}
    </div>
  );
};

export default ProfileData;
