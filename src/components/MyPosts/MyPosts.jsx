import React from "react";
import Post from "./Post/Post";
import classes from "./myPosts.module.scss";

const Myposts = ({ posts, addPost, changePostText, newPostText }) => {
  const items = posts.map((post) => (
    <Post likeCount={post.likeCount} message={post.message} key={post.id} />
  ));
  const newPost = React.createRef();

  const addPostHandler = () => {
    addPost(newPost.current.value);
  };

  const onPostChange = () => {
    changePostText(newPost.current.value);
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
