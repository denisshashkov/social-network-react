import React from "react";
import MyPosts from "./MyPosts";
import {
  addPostActionCreator,
  updateNewPostTextCreator,
} from "../../redux/profileReducer";

const MyPostsContainer = ({ posts, dispatch, newPostText }) => {
  const addPost = () => {
    dispatch(addPostActionCreator());
  };

  const onPostChange = (text) => {
    let action = updateNewPostTextCreator(text);
    dispatch(action);
  };

  return (
    <MyPosts
      posts={posts}
      addPost={addPost}
      updateNewPostText={onPostChange}
      newPostText={newPostText}
    />
  );
};

export default MyPostsContainer;
