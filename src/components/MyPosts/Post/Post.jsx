import React from "react";
import Button from "../../UI/button/Button";
import classes from "./post.module.scss";

const Post = ({ message, likeCount }) => {
  return (
    <div className={classes.item}>
      <div className={classes.item__left}>
        <img
          className={classes.item__avatar}
          src="https://image.shutterstock.com/z/stock-vector-asian-boy-smiling-male-avatar-cartoon-guy-character-facial-expression-smile-vector-illustration-625960208.jpg"
          alt=""
        />
        <div>
          <Button>{likeCount}</Button>
        </div>
      </div>

      <span>{message}</span>
    </div>
  );
};

export default Post;
