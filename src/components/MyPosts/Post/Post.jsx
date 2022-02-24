import React from "react";
import classes from "./post.module.scss";

const Post = ({ message, likeCount }) => {
  return (
    <div className={classes.item}>
      <img
        className={classes.item__avatar}
        src="https://image.shutterstock.com/z/stock-vector-asian-boy-smiling-male-avatar-cartoon-guy-character-facial-expression-smile-vector-illustration-625960208.jpg"
        alt=""
      />
      {message}
      <div>
        <button>{likeCount}</button>
      </div>
    </div>
  );
};

export default Post;
