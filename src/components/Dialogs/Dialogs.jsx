import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import DialogMessage from "./DialogMessage/DialogMessage";
import classes from "./dialogs.module.scss";

const Dialogs = ({
  dialogsData,
  dialogsMessages,
  newMessageBody,
  sendMessage,
  newMessageChange,
}) => {
  const items = dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} key={dialog.id} />
  ));

  const messages = dialogsMessages.map((message) => (
    <DialogMessage text={message.message} key={message.id} />
  ));

  const sendMessageHandler = () => {
    sendMessage();
  };
  const newMessageChangeHandler = (e) => {
    let body = e.target.value;
    newMessageChange(body);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__items}>{items}</div>
      <div className={classes.dialogs__messages}>
        <div>{messages}</div>
        <div>
          <div>
            <textarea
              value={newMessageBody}
              onChange={newMessageChangeHandler}
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <button onClick={sendMessageHandler}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
