import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./dialogItem.module.scss";

const DialogItem = ({ name, id }) => {
  let path = "/dialogs/" + id;
  return (
    <div className={classes.dialogs__item + " " + classes.active}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;
