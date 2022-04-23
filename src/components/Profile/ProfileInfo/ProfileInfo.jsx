import React, { useState } from "react";
import PreLoader from "../../UI/preloader/PreLoader";
import ProfileStatus from "./ProfileStatus";
import avatar from "../../../assets/image/user.png";
import classes from "./profileInfo.module.scss";
import ProfileData from "./ProfileData";
import ProfileDataForm from "../../Forms/ProfileDataForm";
import { useDispatch } from "react-redux";

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  owner,
  savePhoto,
  saveData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const editModeHandler = () => {
    setEditMode(true);
  };
  const choiseAvatarHandler = (e) => {
    dispatch(savePhoto(e.target.files[0]));
  };

  const submitHandler = (formData, submitProps) => {
    dispatch(saveData(formData, submitProps.setStatus));
    setEditMode(false);
  };

  if (!profile) {
    return <PreLoader />;
  }
  return (
    <div>
      <div className={classes.profile__info}>
        <img
          className={classes.profile__info__photo}
          src={profile.photos.large || avatar}
          alt="No Avatar"
        />
        {owner && <input type={"file"} onChange={choiseAvatarHandler} />}
      </div>
      <ProfileStatus status={status} updateStatus={updateStatus} />
      {editMode ? (
        <ProfileDataForm profile={profile} submitHandler={submitHandler} />
      ) : (
        <ProfileData
          profile={profile}
          owner={owner}
          editModeHandler={editModeHandler}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
