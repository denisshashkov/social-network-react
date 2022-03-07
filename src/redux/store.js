import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import navBarReducer from "./navBarReducer";

const store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "how are you?", likeCount: 15 },
        { id: 2, message: "Hello!", likeCount: 24 },
        { id: 3, message: "Yo!", likeCount: 31 },
        { id: 4, message: "what is your name?", likeCount: 8 },
        { id: 5, message: "I am Denis", likeCount: 46 },
      ],
      newPostText: "",
    },
    messagesPage: {
      dialogsData: [
        { id: 1, name: "Denis" },
        { id: 2, name: "Vasya" },
        { id: 3, name: "Nastya" },
        { id: 4, name: "Grisha" },
        { id: 5, name: "Tonya" },
      ],
      dialogsMessages: [
        { id: 1, message: "Hello" },
        { id: 2, message: "Hi!" },
        { id: 3, message: "How are you?" },
        { id: 4, message: "Yo" },
        { id: 5, message: "I am fine thanks!" },
      ],
      newMessageBody: "",
    },
    newsPage: {},
    musicPage: {},
    settingsPage: {},
    navBar: {},
  },
  // _callSubscriber() {
  //   console.log("state rerender");
  // },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = messagesReducer(
      this._state.messagesPage,
      action
    );
    this._state.navBar = navBarReducer(this._state.navBar, action);

    this._callSubscriber(this._state);
  },
};

window.store = store;

export default store;
