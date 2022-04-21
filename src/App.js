import { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import Preloader from "./components/UI/preloader/PreLoader";
import ErrorComponent from "./components/UI/errors/ErrorComponent";
import {
  initializeSuccessThunkCreator,
  globalErrorThunkCreator,
} from "./redux/appReducer";
const DialogsContainer = lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const UsersContainer = lazy(() => import("./components/Users/UsersContainer"));
const News = lazy(() => import("./components/News/News"));
const Music = lazy(() => import("./components/Music/Music"));
const Settings = lazy(() => import("./components/Settings/Settings"));
const Login = lazy(() => import("./components/Login/Login"));

class App extends Component {
  componentDidMount() {
    this.props.initializeSuccessThunkCreator();
    window.addEventListener(
      "unhandledrejection",
      this.props.globalErrorThunkCreator
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.props.globalErrorThunkCreator
    );
  }

  render() {
    if (this.props.globalError) {
      return <ErrorComponent />;
    }
    return (
      <div className="app__wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app__wrapper__content">
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/profile/*" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    globalError: state.app.globalError,
  };
};

export default connect(mapStateToProps, {
  initializeSuccessThunkCreator,
  globalErrorThunkCreator,
})(App);
