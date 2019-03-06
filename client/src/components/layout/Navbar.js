import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOutUser } from "../../store/actions/authActions";
import { clearCurrentProfile } from "../../store/actions/profileActions";

class Navbar extends Component {
  //LOGOUT CLICK CALL
  onLogOutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logOutUser();
    this.props.history.push("/login");
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    let handle = this.props.profile ? this.props.profile.handle : "";

    //IS AUNTHNENTICATED NAV LINKS
    const authLinks = (
      <React.Fragment>
        <li className="user-nav__item">
          <Link className="user-nav__link" to="/feed">
            Post Feed
          </Link>
        </li>
        <li className="user-nav__item">
          <Link className="user-nav__link" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="user-nav__item">
          <Link className="user-nav__link" to={`/profile/${handle}`}>
            <img
              className="user-nav__photo"
              src={user.avatar}
              alt={user.name}
              title="You must have a Gravatar connected to your email to display an image"
            />
          </Link>
        </li>
        <li className="user-nav__item">
          <Link className="user-nav__link" to="/" onClick={this.onLogOutClick}>
            logout
          </Link>
        </li>
      </React.Fragment>
    );

    //NOT AUTHENTICATED NAV LINKS
    const guestLinks = (
      <React.Fragment>
        <li className="user-nav__item">
          <Link className="user-nav__link" to="/register">
            Sign up
          </Link>
        </li>
        <li className="user-nav__item">
          <Link className="user-nav__link" to="/login">
            Login
          </Link>
        </li>
      </React.Fragment>
    );
    return (
      <nav className="header">
        <Link className="logo" to="/">
          DevFConnect
        </Link>

        <ul className="user-nav--box user-nav--call">
          <li className="user-nav__item">
            <Link className="user-nav__link" to="/profiles">
              {" "}
              Developers{" "}
            </Link>
          </li>
        </ul>
        <ul className="user-nav--box">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile
});

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: history => dispatch(logOutUser(history)),
    clearCurrentProfile: () => dispatch(clearCurrentProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
