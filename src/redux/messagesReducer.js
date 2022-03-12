const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

const initialState = {
  dialogsData: [
    { id: 1, name: "Denis" },
    { id: 2, name: "Vasya" },
    { id: 3, name: "Nastya" },
    { id: 4, name: "Grisha" },
    { id: 5, name: "Tonya" },
  ],
  messages: [
    { id: 1, message: "Hello" },
    { id: 2, message: "Hi!" },
    { id: 3, message: "How are you?" },
    { id: 4, message: "Yo" },
    { id: 5, message: "I am fine thanks!" },
  ],
  newMessageBody: "",
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return { ...state, newMessageBody: action.body };

    case SEND_MESSAGE:
      let body = state.newMessageBody;
      return {
        ...state,
        newMessageBody: "",
        messages: [
          ...state.messages,
          {
            id: Date.now(),
            message: body,
          },
        ],
      };

    default:
      return state;
  }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE_BODY,
  body: body,
});

export default messagesReducer;
