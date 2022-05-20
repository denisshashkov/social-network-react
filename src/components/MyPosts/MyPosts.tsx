import React from "react";
import Post from "./Post/Post";
import AddPostForm from "../Forms/AddPostForm";
import classes from "./myPosts.module.scss";
import { PostsType } from "types/types";

type Posts = {
  posts: Array<PostsType>;
};

type AddPost = {
  addPost: (post: PostsType) => void;
};

const Myposts: React.FC<Posts & AddPost> = ({ posts, addPost }) => {
  const items = posts
    .map((post) => (
      <Post likeCount={post.likeCount} message={post.post} key={post.id} />
    ))
    .reverse();

  const addPostHandler = (post: PostsType, submitProps: any) => {
    addPost(post);
    submitProps.resetForm();
  };

  return (
    <div className={classes.posts}>
      <AddPostForm submitHandler={addPostHandler} />
      <div className={classes.posts__items}>{items}</div>
    </div>
  );
};

export default Myposts;
