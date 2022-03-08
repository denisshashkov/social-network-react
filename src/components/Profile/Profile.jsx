import React from "react";
import MyPostsContainer from "../MyPosts/MyPostsContainer";
import classes from "./profile.module.scss";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({ posts, dispatch, newPostText }) => {
  return (
    <main className={classes.profile}>
      <div className={classes.profile__cover}>
        <ProfileInfo />
      </div>
      <MyPostsContainer
        posts={posts}
        newPostText={newPostText}
        dispatch={dispatch}
      />
    </main>
  );
};

export default Profile;
