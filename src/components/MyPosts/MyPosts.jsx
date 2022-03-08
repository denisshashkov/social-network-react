import React from "react";
import Post from "./Post/Post";

import classes from "./myPosts.module.scss";

const Myposts = ({ posts, addPost, updateNewPostText, newPostText }) => {
  const items = posts.map((post) => (
    <Post likeCount={post.likeCount} message={post.message} key={post.id} />
  ));

  const addPostHandler = () => {
    addPost();
  };

  const onPostChangeHandler = (e) => {
    let newText = e.target.value;
    updateNewPostText(newText);
  };

  return (
    <div className={classes.posts}>
      <textarea
        onChange={onPostChangeHandler}
        placeholder="Enter your post"
        value={newPostText}
      ></textarea>
      <button onClick={addPostHandler}>Add Post</button>
      <div className={classes.posts}>{items}</div>
    </div>
  );
};

export default Myposts;
