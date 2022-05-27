import { chatApi, ChatMessageType, StatusType } from "api/chat-api";
import { ThunkAction } from "redux-thunk";
import {
  authAPI,
  ResultCodeForCaptcha,
  ResultCodesEnum,
  securityAPI,
} from "../api/api";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";

const GET_MESSAGES = "GET_MESSAGES";
const SET_STATUS = "SET_STATUS";

const initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

export type InitialStateType = typeof initialState;

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, ...action.payLoad.messages],
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payLoad.status,
      };

    default:
      return state;
  }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
  getMessages: (messages: ChatMessageType[]) =>
    ({
      type: GET_MESSAGES,
      payLoad: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: SET_STATUS,
      payLoad: { status },
    } as const),
};

type ThunkTypes = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
let _newStatusChangedHandler: ((status: StatusType) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.getMessages(messages));
    };
  }
  return _newMessageHandler;
};

const newStatusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_newStatusChangedHandler === null) {
    _newStatusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _newMessageHandler;
};

export const getMessagesThunkCreator = (): ThunkTypes => async (dispatch) => {
  chatApi.startCreateChannel();
  chatApi.subscribeOnNewMessages(
    "messages-received",
    newMessageHandlerCreator(dispatch)
  );
  chatApi.subscribeOnNewMessages(
    "status-changed",
    newStatusChangedHandlerCreator(dispatch)
  );
};

export const stopMessagesThunkCreator = (): ThunkTypes => async (dispatch) => {
  chatApi.unSubscribeFromNewMessages(
    "messages-received",
    newMessageHandlerCreator(dispatch)
  );
  chatApi.unSubscribeFromNewMessages(
    "status-changed",
    newStatusChangedHandlerCreator(dispatch)
  );
  chatApi.closeChannel();
};

export const sendMessageThunkCreator =
  (message: string): ThunkTypes =>
  async () => {
    chatApi.sendMessage(message);
  };

export default chatReducer;
