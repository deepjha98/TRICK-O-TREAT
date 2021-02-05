import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
////////////////////////////////////////////////
const RouteLinks = (props) => {
  const { user } = props.AuthReducer;
  return user ? (
    <Redirect to="/dashboard"></Redirect>
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};
////////////////////////////////////////////////

const mapStateToProps = (state) => {
  return {
    AuthReducer: state.AuthReducer,
  };
};
export default connect(mapStateToProps)(RouteLinks);
