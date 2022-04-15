import React from "react";
import PreLoader from "../../UI/preloader/PreLoader";
import ProfileStatus from "./ProfileStatus";
import avatar from "../../../assets/image/user.png";
import classes from "./profileInfo.module.scss";

const ProfileInfo = ({ profile, status, updateStatus }) => {
  if (!profile) {
    return <PreLoader />;
  }
  return (
    <div>
      <div className={classes.profile__info}>
        <img
          className={classes.profile__info__photo}
          src={profile.photos.large ? profile.photos.large : avatar}
          alt="No Avatar"
        />
        <div className={classes.profile__info__description}>
          <h3>{profile.fullName}</h3>
          <p>{profile.aboutMe}</p>
        </div>
      </div>
      <ProfileStatus status={status} updateStatus={updateStatus} />
    </div>
  );
};

export default ProfileInfo;
