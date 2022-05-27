import React from "react";
import Post from "./Post/Post";
import AddPostForm from "../Forms/AddPostForm";
import classes from "./myPosts.module.scss";
import { PostsType } from "types/types";
import { actions } from "../../redux/profileReducer";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./../../redux/profileSelectors";

const Myposts: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const items = posts.map((post, index) => (
    <Post likeCount={post.likeCount} message={post.post} key={index} />
  ));

  const addPostHandler = (post: PostsType, submitProps: any) => {
    dispatch(actions.addPostActionCreator(post));
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
