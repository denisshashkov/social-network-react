import MyPosts from "./MyPosts";
import { actions } from "../../redux/profileReducer";
import { connect } from "react-redux";
import { AppStateType } from "redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect(mapStateToProps, {
  addPost: actions.addPostActionCreator,
})(MyPosts);

export default MyPostsContainer;
