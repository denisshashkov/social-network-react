import { combineReducers, createStore } from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import navBarReducer from "./navBarReducer";
import usersReducer from "./usersReducer";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  navBar: navBarReducer,
  usersPage: usersReducer,
});

const store = createStore(reducers);

export default store;
