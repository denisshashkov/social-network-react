import React from "react";
import classes from "./messages.module.scss";
import { useDispatch } from "react-redux";
import { sendMessageThunkCreator } from "redux/chatReducer";
import AddMessageForm from "components/Forms/AddMessageForm";
import { Chat } from "./Chat/Chat";

const Dialogs: React.FC = () => {
  type MessageFormType = {
    message: string;
  };
  const dispatch = useDispatch();
  const sendMessageHandler = (message: MessageFormType, submitProps: any) => {
    dispatch(sendMessageThunkCreator(message.message));
    submitProps.resetForm();
  };

  return (
    <div className={classes.messages}>
      <Chat />

      <AddMessageForm submitHandler={sendMessageHandler} />
    </div>
  );
};

export default Dialogs;
