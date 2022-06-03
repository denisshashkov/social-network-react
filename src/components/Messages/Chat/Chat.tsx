import { useEffect } from "react";

import { Messages } from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesThunkCreator,
  stopMessagesThunkCreator,
} from "redux/chatReducer";
import { getStatus } from "redux/chatSelectors";

export const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  useEffect(() => {
    dispatch(getMessagesThunkCreator());
    return () => {
      dispatch(stopMessagesThunkCreator());
    };
  }, []);

  return <Messages />;
};
