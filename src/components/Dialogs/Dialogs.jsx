import React from "react";
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

  const sendMessageHandler = () => {
    props.sendMessage();
  };
  const newMessageChangeHandler = (e) => {
    let body = e.target.value;
    props.newMessageChange(body);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__items}>{items}</div>
      <div className={classes.dialogs__messages}>
        <div>{messages}</div>
        <div>
          <div>
            <textarea
              value={props.newMessageBody}
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
