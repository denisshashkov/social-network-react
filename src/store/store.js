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
    },
    newsPage: {},
    musicPage: {},
    settingsPage: {},
  },
  _callSubscriber() {
    console.log("state rerender");
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    if (action.type === "ADD-POST") {
      let newPost = {
        id: Date.now(),
        message: this._state.profilePage.newPostText,
        likeCount: 0,
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber();
    } else if (action.type === "UPDATE-NEW-POST-TEXT") {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber();
    } else if (action.type === "ADD-USER") {
      let newUser = {
        id: Date.now(),
        name: action.userName,
      };
      this._state.messagesPage.dialogsData.push(newUser);
      this._callSubscriber();
    }
  },
};

window.store = store;

export default store;
