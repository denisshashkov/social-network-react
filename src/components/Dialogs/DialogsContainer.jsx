import Dialogs from "./Dialogs";
import {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../../redux/messagesReducer";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    messagesPage: state.messagesPage,
    newMessageBody: state.messagesPage.newMessageBody,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
    newMessageChange: (text) => {
      dispatch(updateNewMessageBodyCreator(text));
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
