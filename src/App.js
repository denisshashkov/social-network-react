import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import Preloader from "./components/UI/preloader/PreLoader";
import ErrorComponent from "./components/UI/errors/ErrorComponent";
import { getGlobalError } from "./redux/appSelectors";
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

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector(getGlobalError);
  useEffect(() => {
    dispatch(initializeSuccessThunkCreator());
    window.addEventListener("unhandledrejection", function (event) {
      dispatch(globalErrorThunkCreator(event));
    });
    return () => {
      window.removeEventListener("unhandledrejection", function (event) {
        dispatch(globalErrorThunkCreator(event));
      });
    };
  }, []);

  if (error) {
    return <ErrorComponent />;
  }
  return (
    <div>
      <HeaderContainer />
      <div className="app__wrapper">
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
    </div>
  );
};

export default App;
