import React from "react";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../../redux/messagesReducer";
import DialogItem from "./DialogItem/DialogItem";
import DialogMessage from "./DialogMessage/DialogMessage";
import classes from "./dialogs.module.scss";

const Dialogs = ({
  dialogsData,
  dialogsMessages,
  newMessageBody,
  dispatch,
}) => {
  const items = dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} key={dialog.id} />
  ));

  const messages = dialogsMessages.map((message) => (
    <DialogMessage text={message.message} key={message.id} />
  ));

  const sendMessageHandler = () => {
    dispatch(sendMessageCreator());
  };
  const NewMessageChangeHandler = (e) => {
    let body = e.target.value;
    dispatch(updateNewMessageBodyCreator(body));
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
              onChange={NewMessageChangeHandler}
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
