import React, { Component } from "react";
import Users from "./Users.tsx";
import Preloader from "../common/preloader/PreLoader";
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
import {
  getUsersThunkCreator,
  unFollowThunkCreator,
  followThunkCreator,
  follow,
  unFollow,
  getCurrentPage,
  disabledButton,
} from "../../redux/usersReducer.ts";
import { connect } from "react-redux";
import {
  getAllUsers,
  getFollowingProgress,
  getIsFetching,
  getPageSize,
  getTotalUserCount,
  getPage,
} from "../../redux/usersSelectors.ts";

type PropsType = {
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  users: Array<UsersType>;
  followingProgress: Array<number>;

  followThunkCreator: () => void;
  unFollowThunkCreator: () => void;
  getUsersThunkCreator: (currentPage: number, pageSize: number) => void;
};

class UsersContainer extends Component<PropsType> {
  componentDidMount = () => {
    const { currentPage, pageSize } = this.props;

    this.props.getUsersThunkCreator(currentPage, pageSize);
  };

  changePageHandler = (page: number) => {
    const { pageSize } = this.props;
    this.props.getUsersThunkCreator(page, pageSize);
  };

  render = () => {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          changePageHandler={this.changePageHandler}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          users={this.props.users}
          followThunkCreator={this.props.followThunkCreator}
          unFollowThunkCreator={this.props.unFollowThunkCreator}
          followingProgress={this.props.followingProgress}
        />
      </>
    );
  };
}

const mapStateToProps = (state: AppStateType) => {
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
