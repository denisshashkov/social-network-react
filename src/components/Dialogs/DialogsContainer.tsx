import Dialogs from "./Dialogs";
import { withAuthNavigate } from "../../hoc/authNavigate";
import { sendMessageCreator } from "../../redux/messagesReducer";
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
    //newMessageBody: state.messagesPage.newMessageBody,
    auth: state.auth.isAuth,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage: (message: string) => {
      dispatch(sendMessageCreator(message));
    },
  };
};

export default compose(
  withAuthNavigate,
  connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);
