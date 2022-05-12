import React, { Component } from "react";
import Users from "./Users";
import Preloader from "../common/preloader/PreLoader";
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
import {
  getUsersThunkCreator,
  unFollowThunkCreator,
  followThunkCreator,
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

type MapStatePropsType = {
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  users: Array<UsersType>;
  followingProgress: Array<number>;
};

type MapDispatchPropsType = {
  followThunkCreator: (user: UsersType) => void;
  unFollowThunkCreator: (user: UsersType) => void;
  getUsersThunkCreator: (currentPage: number, pageSize: number) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

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
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          changePageHandler={this.changePageHandler}
          users={this.props.users}
          followThunkCreator={this.props.followThunkCreator}
          unFollowThunkCreator={this.props.unFollowThunkCreator}
          followingProgress={this.props.followingProgress}
        />
      </>
    );
  };
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
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
  getUsersThunkCreator,
  unFollowThunkCreator,
  followThunkCreator,
})(UsersContainer);
