import React from "react";
import classes from "./preloader.module.scss";

const Preloader = () => {
  return (
    <div>
      <div className={classes.loading}></div>
    </div>
  );
};

export default Preloader;
