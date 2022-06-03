import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Preloader from "./components/common/preloader/PreLoader";
import ErrorComponent from "./components/common/errors/ErrorComponent";
import { getGlobalError } from "./redux/appSelectors";
import {
  initializeSuccessThunkCreator,
  globalErrorThunkCreator,
} from "./redux/appReducer";
const MessagesPage = lazy(() => import("./components/Messages/MessagesPage"));
const ProfileContainer = lazy(
  () => import("./components/Profile/ProfileContainer")
);
const UsersPage = lazy(() => import("./components/Users/UsersPage"));
const News = lazy(() => import("./components/News/News"));
const Music = lazy(() => import("./components/Music/Music"));
const Settings = lazy(() => import("./components/Settings/Settings"));
const Login = lazy(() => import("./components/Login/Login"));

const App: React.FC = () => {
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
      <Header />
      <div className="app__wrapper">
        <Navbar />
        <div className="app__wrapper__content">
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/profile/*" element={<ProfileContainer />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/dialogs" element={<MessagesPage />} />
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
