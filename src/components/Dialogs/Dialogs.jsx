import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import DialogMessage from "./DialogMessage/DialogMessage";
import classes from "./dialogs.module.scss";

const Dialogs = ({ dialogsData, dialogsMessages, addUser }) => {
  const items = dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} key={dialog.id} />
  ));

  const messages = dialogsMessages.map((message) => (
    <DialogMessage text={message.message} key={message.id} />
  ));

  const name = React.createRef();
  const addNameHandler = () => {
    addUser(name.current.value);
    name.current.value = "";
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__items}>{items}</div>
      <div className={classes.dialogs__messages}>{messages}</div>
      <textarea ref={name}></textarea>
      <button onClick={addNameHandler}>add</button>
    </div>
  );
};

export default Dialogs;
