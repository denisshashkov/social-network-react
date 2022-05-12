import { DialogsDataType, MessagesType } from "../types/types";
const SEND_MESSAGE = "SEND-MESSAGE";

const initialState = {
  dialogsData: [
    { id: 1, name: "Denis" },
    { id: 2, name: "Vasya" },
    { id: 3, name: "Nastya" },
    { id: 4, name: "Grisha" },
    { id: 5, name: "Tonya" },
  ] as Array<DialogsDataType>,
  messages: [
    { id: 1, message: "Hello" },
    { id: 2, message: "Hi!" },
    { id: 3, message: "How are you?" },
    { id: 4, message: "Yo" },
    { id: 5, message: "I am fine thanks!" },
  ] as Array<MessagesType>,
};

export type InitialStateType = typeof initialState;

const messagesReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };

    default:
      return state;
  }
};

type SendMessageCreatorType = {
  type: typeof SEND_MESSAGE;
  message: string;
};

export const sendMessageCreator = (
  message: string
): SendMessageCreatorType => ({
  type: SEND_MESSAGE,
  message,
});

export default messagesReducer;
