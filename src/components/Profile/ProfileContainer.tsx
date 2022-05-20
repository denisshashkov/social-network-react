import React, { useEffect } from "react";
import Profile from "./Profile";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  getProfile,
  getStatus,
  getAuthorizedUserId,
  getIsAuth,
} from "../../redux/profileSelectors";
import {
  getProfileThunkCreator,
  getProfileStatusThunkCreator,
  updateProfileStatusThunkCreator,
  savePhotoThunkCreator,
  saveDataThunkCreator,
} from "../../redux/profileReducer";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const status = useSelector(getStatus);
  const authorizedUserId = useSelector(getAuthorizedUserId);
  const isAuth = useSelector(getIsAuth);
  const match = useMatch("/profile/:userId/");
  const userId = match ? match.params.userId : authorizedUserId;

  useEffect(() => {
    if (isAuth || match) {
      dispatch(getProfileThunkCreator(userId as number));
      dispatch(getProfileStatusThunkCreator(userId as number));
    }
  }, [userId]);

  if (!isAuth) return <Navigate to={"/login"} />;
  return (
    <Profile
      owner={match === null}
      profile={profile}
      status={status}
      updateStatus={updateProfileStatusThunkCreator}
      savePhoto={savePhotoThunkCreator}
      saveData={saveDataThunkCreator}
    />
  );
};

export default ProfileContainer;
