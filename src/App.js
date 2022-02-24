import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

function App({ state, addUser, addPost, changePostText }) {
  return (
    <BrowserRouter>
      <div className="app__wrapper">
        <Header />
        <Navbar />
        <div className="app__wrapper__content">
          <Routes>
            <Route
              path="/profile"
              element={
                <Profile
                  posts={state.profilePage.posts}
                  newPostText={state.profilePage.newPostText}
                  addPost={addPost}
                  changePostText={changePostText}
                />
              }
            />
            <Route
              path="/dialogs"
              element={
                <Dialogs
                  dialogsData={state.messagesPage.dialogsData}
                  dialogsMessages={state.messagesPage.dialogsMessages}
                  addUser={addUser}
                />
              }
            />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
