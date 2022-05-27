import React, { useEffect, useRef } from "react";
import classes from "./dialogs.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "./../../redux/chatSelectors";
import { ChatMessageType } from "api/chat-api";
import {
  getMessagesThunkCreator,
  sendMessageThunkCreator,
  stopMessagesThunkCreator,
} from "redux/chatReducer";

import AddMessageForm from "components/Forms/AddMessageForm";
import { getStatus } from "redux/chatSelectors";

const Dialogs: React.FC = () => {
  type MessageFormType = {
    message: string;
  };
  const dispatch = useDispatch();
  const sendMessageHandler = (message: MessageFormType, submitProps: any) => {
    dispatch(sendMessageThunkCreator(message.message));
    submitProps.resetForm();
  };

  const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector(getStatus);
    useEffect(() => {
      dispatch(getMessagesThunkCreator());
      return () => {
        dispatch(stopMessagesThunkCreator());
      };
    }, []);

    return (
      <div>
        {/* {status === "error" && <div>Oops some error. Please reload page!</div>} */}
        <Messages />
      </div>
    );
  };

  const Messages: React.FC = () => {
    const messages = useSelector(getMessages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
      <div>
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesAnchorRef}></div>
      </div>
    );
  };

  const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
      <div>
        <img src={message.photo} alt="" />
        <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
      </div>
    );
  };

  return (
    <div className={classes.dialogs}>
      <div>
        <Chat />
      </div>
      {/* <div className={classes.dialogs__block}>
        <div className={classes.dialogs__items}>{items}</div>
        <div className={classes.dialogs__messages}>{messages}</div>
      </div> */}
      {/* <AddMessageForm submitHandler={sendMessageHandler} /> */}
      <AddMessageForm submitHandler={sendMessageHandler} />
    </div>
  );
};

export default Dialogs;
