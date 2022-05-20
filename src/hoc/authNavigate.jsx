import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

let mapStateToPropsForNavigate = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthNavigate = (Component) => {
  function navigateComponent(props) {
    if (!props.isAuth) return <Navigate to={"/login"} />;
    return <Component {...props} />;
  }

  let ConnectedAuthNavigateComponent = connect(mapStateToPropsForNavigate)(
    navigateComponent
  );

  return ConnectedAuthNavigateComponent;
};
