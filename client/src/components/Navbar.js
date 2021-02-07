import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postLogout } from "../store/actions";
///////////////////////////////////////////////
class Navbar extends React.Component {
  //  Logout functionality
  userLogout = () => {
    this.props.postLogout();
  };
  /*
    Check whether the user exists 
    if yes then show only logout
    else show login and register
  */
  rightLinks = (user) => {
    return user ? (
      <div className="navbar__right">
        <li>
          <Link to="/create">New post</Link>
        </li>
        <li>
          <Link to={`/${user._id}`}>{user.name.split(" ", 1)}</Link>
        </li>
        <li>
          <a href="/">
            <span onClick={this.userLogout}>Logout</span>
          </a>
        </li>
      </div>
    ) : (
      <div className="navbar__right">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </div>
    );
  };
  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar__row">
            <div className="navbar__left">
              <Link to="/">
                <img src="/images/logo.png" alt="logo"></img>
              </Link>
            </div>
            {this.rightLinks(this.props.user)}
          </div>
        </div>
      </nav>
    );
  }
}
///////////////////////////////////////////////
const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
  };
};
export default connect(mapStateToProps, { postLogout })(Navbar);
