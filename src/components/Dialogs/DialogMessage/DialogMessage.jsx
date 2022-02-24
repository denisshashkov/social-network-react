import React from "react";
import classes from "./dialogMessage.module.scss";

const DialogMessage = ({ text }) => {
  return <div className={classes.dialogs__message}>{text}</div>;
};

export default DialogMessage;
