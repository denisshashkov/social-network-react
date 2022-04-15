import React from "react";
import Post from "./Post/Post";
import AddPostForm from "../Forms/AddPostForm";
import classes from "./myPosts.module.scss";

const Myposts = (props) => {
  let state = props.profilePage;
  const items = state.posts.map((post) => (
    <Post likeCount={post.likeCount} message={post.post} key={post.id} />
  ));

  const addPostHandler = (post, submitProps) => {
    props.addPost(post);
    submitProps.resetForm();
  };

  return (
    <div className={classes.posts}>
      <AddPostForm submitHandler={addPostHandler} />
      <div className={classes.posts}>{items}</div>
    </div>
  );
};

export default Myposts;
