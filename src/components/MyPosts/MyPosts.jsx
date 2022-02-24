import React from "react";
import Post from "./Post/Post";
import classes from "./myPosts.module.scss";

const Myposts = ({ posts, dispatch, newPostText }) => {
  const items = posts.map((post) => (
    <Post likeCount={post.likeCount} message={post.message} key={post.id} />
  ));
  let newPost = React.createRef();

  const addPostHandler = () => {
    dispatch({ type: "ADD-POST" });
  };

  const onPostChange = () => {
    dispatch({ type: "UPDATE-NEW-POST-TEXT", newText: newPost.current.value });
  };

  return (
    <div className={classes.posts}>
      <textarea
        ref={newPost}
        onChange={onPostChange}
        value={newPostText}
      ></textarea>
      <button onClick={addPostHandler}>Add Post</button>
      <div className={classes.posts}>{items}</div>
    </div>
  );
};

export default Myposts;
