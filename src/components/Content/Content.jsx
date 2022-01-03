import React from "react";
import Myposts from "../MyPosts/MyPosts";
import classes from "./content.module.scss";

const Content = () => {
  return (
    <main className={classes.content}>
      <div>
        <img
          className={classes.content__image}
          src="https://media-exp1.licdn.com/dms/image/C4D1BAQGDmALg_8s-Yg/company-background_10000/0/1519799119530?e=2159024400&v=beta&t=4WV9YKR9L3PAEnppWmPPMk5xVnETtWvhZN8NexEzPwM"
          alt=""
        />
      </div>
      <div>avatar + description</div>
      <Myposts />
    </main>
  );
};

export default Content;
