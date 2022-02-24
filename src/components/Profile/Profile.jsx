import React from "react";
import Myposts from "../MyPosts/MyPosts";
import classes from "./profile.module.scss";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({ posts, addPost, changePostText, newPostText }) => {
  return (
    <main className={classes.profile}>
      <div className={classes.profile__cover}>
        <ProfileInfo />
      </div>

      <Myposts
        posts={posts}
        newPostText={newPostText}
        addPost={addPost}
        changePostText={changePostText}
      />
    </main>
  );
};

export default Profile;
