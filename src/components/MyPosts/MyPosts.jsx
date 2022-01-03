import React from "react";
import Post from "./Post/Post";
import classes from "./myPosts.module.scss";

const Myposts = () => {
  return (
    <div>
      <textarea></textarea>
      <button>Add Post</button>
      <div className={classes.posts}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Myposts;
