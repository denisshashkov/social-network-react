import React, { Component } from "react";
import Users from "./Users";
import Preloader from "../UI/preloader/PreLoader";
import {
  getUsersThunkCreator,
  unFollowThunkCreator,
  followThunkCreator,
  follow,
  unFollow,
  getCurrentPage,
  disabledButton,
} from "../../redux/usersReducer";
import { connect } from "react-redux";
import {
  getAllUsers,
  getFollowingProgress,
  getIsFetching,
  getPageSize,
  getTotalUserCount,
  getPage,
} from "../../redux/usersSelectors";

class UsersContainer extends Component {
  componentDidMount = () => {
    const { currentPage, pageSize } = this.props;

    this.props.getUsersThunkCreator(currentPage, pageSize);
  };

  changePageHandler = (page) => {
    const { pageSize } = this.props;
    this.props.getUsersThunkCreator(page, pageSize);
  };

  render = () => {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users {...this.props} changePageHandler={this.changePageHandler} />
      </>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    users: getAllUsers(state),
    followingProgress: getFollowingProgress(state),
    isFetching: getIsFetching(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUserCount(state),
    currentPage: getPage(state),
  };
};

export default connect(mapStateToProps, {
  follow,
  unFollow,
  getCurrentPage,
  disabledButton,
  getUsersThunkCreator,
  unFollowThunkCreator,
  followThunkCreator,
})(UsersContainer);
