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
    <div className={classes.info__wrapper}>
      <div className={classes.profile__info}>
        <img
          className={classes.profile__info__photo}
          src={profile.photos.large || avatar}
          alt="No Avatar"
        />
        {owner && (
          <label htmlFor="input__file" className={classes.input__file__label}>
            <input
              type={"file"}
              id="input__file"
              className={classes.input__file}
              onChange={choiseAvatarHandler}
            />
            Upload image
          </label>
        )}
      </div>
      <div className={classes.profile__data}>
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
    </div>
  );
};

export default ProfileInfo;
