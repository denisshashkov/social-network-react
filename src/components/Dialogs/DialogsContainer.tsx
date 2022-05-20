import Dialogs from "./Dialogs";
import { withAuthNavigate } from "../../hoc/authNavigate";
import { actions } from "../../redux/messagesReducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStateType } from "redux/redux-store";
import { messagesPageType } from "../../types/types";

type MapStatePropsType = {
  messagesPage: messagesPageType;
  auth: boolean;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    messagesPage: state.messagesPage,
    auth: state.auth.isAuth,
  };
};

export default compose(
  withAuthNavigate,
  connect(mapStateToProps, { ...actions })
)(Dialogs);
