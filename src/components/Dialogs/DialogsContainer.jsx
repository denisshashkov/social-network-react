import React from "react";
import Dialogs from "./Dialogs";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../../redux/messagesReducer";

const DialogsContainer = ({
  dialogsData,
  dialogsMessages,
  newMessageBody,
  dispatch,
}) => {
  const sendMessage = () => {
    dispatch(sendMessageCreator());
  };
  const newMessageChange = (text) => {
    let action = updateNewMessageBodyCreator(text);
    dispatch(action);
  };

  return (
    <Dialogs
      newMessageBody={newMessageBody}
      dialogsData={dialogsData}
      dialogsMessages={dialogsMessages}
      sendMessage={sendMessage}
      newMessageChange={newMessageChange}
    />
  );
};

export default DialogsContainer;
