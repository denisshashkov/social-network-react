import React, { ChangeEvent, useState } from "react";
import PreLoader from "../../common/preloader/PreLoader";
import ProfileStatus from "./ProfileStatus";
import avatar from "../../../assets/image/user.png";
import classes from "./profileInfo.module.scss";
import ProfileData from "./ProfileData";
import ProfileDataForm from "../../Forms/ProfileDataForm";
import { useDispatch } from "react-redux";
import { ProfileType } from "types/types";
import { PropsType } from "../Profile";

const ProfileInfo: React.FC<PropsType> = ({
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
  const choiseAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(savePhoto(e.target.files[0]));
  };

  const submitHandler = (formData: ProfileType, submitProps: any) => {
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
