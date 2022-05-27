import { DialogsDataType, MessageType } from "../types/types";
import { InferActionsTypes } from "./redux-store";
const SEND_MESSAGE = "SEND-MESSAGE";

const initialState = {};

export type InitialStateType = typeof initialState;

const messagesReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [],
      };

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  sendMessage: (message: MessageType) => ({
    type: SEND_MESSAGE,
    message,
  }),
};

export default messagesReducer;
