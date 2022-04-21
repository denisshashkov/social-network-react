import React, { Component } from "react";
import Profile from "./Profile";
import { useMatch } from "react-router-dom";
import { connect } from "react-redux";
import { withAuthNavigate } from "../../hoc/authNavigate";
import {
  getProfileThunkCreator,
  getProfileStatusThunkCreator,
  updateProfileStatusThunkCreator,
  savePhotoThunkCreator,
  saveDataThunkCreator,
} from "../../redux/profileReducer";
import { compose } from "redux";

class ProfileContainer extends Component {
  refreshProfile() {
    let userId = this.props.match
      ? this.props.match.params.userId
      : this.props.authorizedUserId;
    this.props.getProfileThunkCreator(userId);
    this.props.getProfileStatusThunkCreator(userId);
  }

  componentDidMount = () => {
    this.refreshProfile();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.match !== prevProps.match) {
      this.refreshProfile();
    }
  };

  render() {
    return (
      <Profile
        {...this.props}
        owner={this.props.match === null}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateProfileStatusThunkCreator}
        savePhoto={this.props.savePhotoThunkCreator}
        saveData={this.props.saveDataThunkCreator}
      />
    );
  }
}

const ProfileURLMatch = (props) => {
  const match = useMatch("/profile/:userId/");
  return <ProfileContainer {...props} match={match} />;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
  };
};

export default compose(
  withAuthNavigate,
  connect(mapStateToProps, {
    getProfileThunkCreator,
    getProfileStatusThunkCreator,
    updateProfileStatusThunkCreator,
    savePhotoThunkCreator,
    saveDataThunkCreator,
  })
)(ProfileURLMatch);
