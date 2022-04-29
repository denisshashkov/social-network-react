import React from "react";
import AddMessageForm from "../Forms/AddMessageForm";
import DialogItem from "./DialogItem/DialogItem";
import DialogMessage from "./DialogMessage/DialogMessage";
import classes from "./dialogs.module.scss";

const Dialogs = (props) => {
  let state = props.messagesPage;
  const items = state.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} key={dialog.id} />
  ));

  const messages = state.messages.map((message) => (
    <DialogMessage text={message.message} key={message.id} />
  ));

  const sendMessageHandler = (message, submitProps) => {
    props.sendMessage(message);
    submitProps.resetForm();
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__block}>
        <div className={classes.dialogs__items}>{items}</div>
        <div className={classes.dialogs__messages}>{messages}</div>
      </div>
      <AddMessageForm submitHandler={sendMessageHandler} />
    </div>
  );
};

export default Dialogs;
