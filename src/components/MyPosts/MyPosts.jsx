import React from "react";
import Post from "./Post/Post";

import classes from "./myPosts.module.scss";

const Myposts = (props) => {
  let state = props.profilePage;
  const items = state.posts.map((post) => (
    <Post likeCount={post.likeCount} message={post.message} key={post.id} />
  ));

  const addPostHandler = () => {
    props.addPost();
  };

  const onPostChangeHandler = (e) => {
    let newText = e.target.value;
    props.updateNewPostText(newText);
  };

  return (
    <div className={classes.posts}>
      <textarea
        onChange={onPostChangeHandler}
        placeholder="Enter your post"
        value={props.newPostText}
      ></textarea>
      <button onClick={addPostHandler}>Add Post</button>
      <div className={classes.posts}>{items}</div>
    </div>
  );
};

export default Myposts;
