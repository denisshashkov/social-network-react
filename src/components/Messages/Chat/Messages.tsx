import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getMessages } from "redux/chatSelectors";
import { Message } from "./Message";
import classes from "../messages.module.scss";

export const Messages: React.FC = () => {
  const messages = useSelector(getMessages);
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let element = e.currentTarget;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      !autoScroll && setAutoScroll(true);
    } else {
      autoScroll && setAutoScroll(false);
    }
  };
  useEffect(() => {
    if (autoScroll) {
      setTimeout(() => {
        messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);
  return (
    <div className={classes.messages__list} onScroll={scrollHandler}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  );
};
