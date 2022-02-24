import React from "react";
import Myposts from "../MyPosts/MyPosts";
import classes from "./profile.module.scss";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({ posts, dispatch, newPostText }) => {
  return (
    <main className={classes.profile}>
      <div className={classes.profile__cover}>
        <ProfileInfo />
      </div>

      <Myposts posts={posts} newPostText={newPostText} dispatch={dispatch} />
    </main>
  );
};

export default Profile;
