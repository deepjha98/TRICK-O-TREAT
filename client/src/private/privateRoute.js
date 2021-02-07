import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
////////////////////////////////////////////////
const PrivateRoute = (props) => {
  const { user } = props.AuthReducer;
  return user ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};
////////////////////////////////////////////////
const mapStateToProps = (state) => {
  return {
    AuthReducer: state.AuthReducer,
  };
};
export default connect(mapStateToProps)(PrivateRoute);
