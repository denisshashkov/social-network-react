import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import profileReducer from "./profileReducer.ts";
import messagesReducer from "./messagesReducer.ts";
import navBarReducer from "./navBarReducer.ts";
import usersReducer from "./usersReducer.ts";
import authReducer from "./authReducer.ts";
import thunkMiddleWare from "redux-thunk";
import appReducer from "./appReducer.ts";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  navBar: navBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

type Reducers = typeof reducers;
export type AppStateType = ReturnType<Reducers>;
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleWare))
);

export default store;
