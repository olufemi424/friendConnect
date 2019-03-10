import React, { Component } from "react";
import DrawerTogglerButton from "./DrawerTogglerButton";
import { Link, NavLink } from "react-router-dom";

import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOutUser } from "../../../store/actions/authActions";
import { clearCurrentProfile } from "../../../store/actions/profileActions";

class NewNavbar extends Component {
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
        <li className="toolbar__navigation__list-item">
          <NavLink className="toolbar__navigation__link" to="/feed">
            Post Feed
          </NavLink>
        </li>
        <li className="toolbar__navigation__list-item">
          <NavLink className="toolbar__navigation__link" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li className="toolbar__navigation__list-item">
          <NavLink className="toolbar__navigation__link" to="/chatroom">
            {" "}
            Chat Room
          </NavLink>
        </li>
        <li className="toolbar__navigation__list-item">
          <a
            className="toolbar__navigation__link"
            href="#!"
            onClick={this.onLogOutClick}
          >
            Logout
          </a>
        </li>
      </React.Fragment>
    );

    const profileAvatar = (
      <div className="toolbar__navigation__image">
        <NavLink className="" to={`/profile/${handle}`}>
          {" "}
          <img
            className="toolbar__navigation__image"
            src={user.avatar}
            alt={user.name}
            title="You must have Gravatar connected to your email to display an image"
          />
        </NavLink>
      </div>
    );

    //NOT AUTHENTICATED NAV LINKS
    const guestLinks = (
      <React.Fragment>
        <li className="toolbar__navigation__list-item">
          <NavLink className="toolbar__navigation__link" to="/register">
            Signup
          </NavLink>
        </li>
        <li className="toolbar__navigation__list-item">
          <NavLink className="toolbar__navigation__link" to="/login">
            Login
          </NavLink>
        </li>
      </React.Fragment>
    );
    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__button">
            <DrawerTogglerButton
              click={this.props.drawerClickHandler}
              handle={handle}
              user={user}
            />
          </div>
          <div className="toolbar__logo">
            <NavLink className="toolbar__logo--link" to="/">
              DevFConnect
            </NavLink>
          </div>
          <ul className="toolbar__navigation__list">
            <li className="toolbar__navigation__list-item">
              <NavLink className="toolbar__navigation__link" to="/profiles">
                Developers
              </NavLink>
            </li>
          </ul>
          <div className="toolbar__navigation-box">
            <ul className="toolbar__navigation__list">
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
            {isAuthenticated ? profileAvatar : null}
          </div>
        </nav>
      </header>
    );
  }
}

NewNavbar.propTypes = {
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
)(withRouter(NewNavbar));
