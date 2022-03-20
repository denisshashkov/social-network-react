import React from "react";
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import classes from "./profile.module.scss";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
  return (
    <main className={classes.profile}>
      <div className={classes.profile__cover}>
        <ProfileInfo />
      </div>
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
