import { ChatMessageType } from "api/chat-api";
import React from "react";
import classes from "../messages.module.scss";

export const Message: React.FC<{ message: ChatMessageType }> = React.memo(
  ({ message }) => {
    return (
      <div className={classes.messages__items}>
        <img src={message.photo} alt="" />
        <b>{message.userName}</b>
        <br />
        {message.message}
      </div>
    );
  }
);
