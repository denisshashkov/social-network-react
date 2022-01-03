import React from "react";
import classes from "./post.module.scss";

const Post = () => {
  return (
    <div className={classes.item}>
      <img
        className={classes.item__avatar}
        src="https://image.shutterstock.com/z/stock-vector-asian-boy-smiling-male-avatar-cartoon-guy-character-facial-expression-smile-vector-illustration-625960208.jpg"
        alt=""
      />
      Post text
      <div>
        <button>Like!</button>
      </div>
    </div>
  );
};

export default Post;
