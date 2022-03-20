import React, { Component } from "react";
import axios from "axios";
import Users from "./Users";
import {
  followActionCreator,
  unfollowActionCreator,
  getUsersActionCreator,
  getCurrentPageActionCreator,
  getUsersCountCreator,
} from "../../redux/usersReducer";
import { connect } from "react-redux";

class UsersApiComponent extends Component {
  componentDidMount = () => {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.getUsers(response.data.items);
        this.props.getUsersCount(response.data.totalCount);
      });
  };

  changePageHandler = (page) => {
    this.props.getCurrentPage(page);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.getUsers(response.data.items);
      });
  };

  render = () => {
    return (
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        changePageHandler={this.changePageHandler}
        users={this.props.users}
        follow={this.props.follow}
        unFollow={this.props.unFollow}
      />
    );
  };
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followActionCreator(userId));
    },
    unFollow: (userId) => {
      dispatch(unfollowActionCreator(userId));
    },
    getUsers: (users) => {
      dispatch(getUsersActionCreator(users));
    },
    getUsersCount: (usersCount) => {
      dispatch(getUsersCountCreator(usersCount));
    },
    getCurrentPage: (page) => {
      dispatch(getCurrentPageActionCreator(page));
    },
  };
};

const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersApiComponent);

export default UsersContainer;
