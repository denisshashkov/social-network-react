import React from "react";
import AddMessageForm from "../Forms/AddMessageForm";
import DialogItem from "./DialogItem/DialogItem";
import DialogMessage from "./DialogMessage/DialogMessage";
import { messagesPageType } from "../../types/types";
import classes from "./dialogs.module.scss";

type PropsType = {
  messagesPage: messagesPageType;
  sendMessage: (message: string) => void;
};

const Dialogs: React.FC<PropsType> = (props) => {
  let state = props.messagesPage;
  const items = state.dialogsData.map((item) => (
    <DialogItem name={item.name} key={item.id} id={item.id} />
  ));

  const messages = state.messages.map((message) => (
    <DialogMessage text={message.message} key={message.id} />
  ));

  const sendMessageHandler = (message: string, submitProps: any) => {
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
