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
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log("state rerender");
  },
  addUser(userName) {
    let newUser = {
      id: Date.now(),
      name: userName,
    };
    this._state.messagesPage.dialogsData.push(newUser);
    this._callSubscriber();
  },
  addPost() {
    let newPost = {
      id: Date.now(),
      message: this._state.profilePage.newPostText,
      likeCount: 0,
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = "";
    this._callSubscriber();
  },
  changePostText(newText) {
    this._state.profilePage.newPostText = newText;
    this._callSubscriber();
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
};

window.store = store;

export default store;
