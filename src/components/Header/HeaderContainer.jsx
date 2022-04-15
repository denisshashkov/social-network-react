/* eslint-disable no-undef */
import React, { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { setLogoutThunkCreator } from "../../redux/authReducer";

class HeaderContainer extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, {
  setLogoutThunkCreator,
})(HeaderContainer);
