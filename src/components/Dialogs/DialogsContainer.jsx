import Dialogs from "./Dialogs";
import { withAuthNavigate } from "../../hoc/authNavigate";
import { sendMessageCreator } from "../../redux/messagesReducer.ts";
import { connect } from "react-redux";
import { compose } from "redux";

const mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
    newMessageBody: state.messagesPage.newMessageBody,
    auth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => {
      dispatch(sendMessageCreator(message));
    },
  };
};

export default compose(
  withAuthNavigate,
  connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);
