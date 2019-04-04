import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOutUser } from "../../../store/actions/authActions";
import { clearCurrentProfile } from "../../../store/actions/profileActions";

class SideDrawer extends Component {
  onLogOutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logOutUser();
  };
  render() {
    let drawerClasses = ["side-drawer"];

    const { isAuthenticated } = this.props.auth;

    if (this.props.show) {
      drawerClasses = ["side-drawer open"];
    }

    return (
      <nav className={drawerClasses}>
        <ul className="side-drawer__list">
          <li className="side-drawer__list-item">
            <NavLink to="/profiles">Developers</NavLink>
          </li>
          {isAuthenticated ? (
            <React.Fragment>
              <li className="side-drawer__list-item">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li className="side-drawer__list-item">
                <NavLink to="/feed">Post Feed</NavLink>
              </li>
              <li className="side-drawer__list-item">
                <NavLink to="/chatroom">Chat Room</NavLink>
              </li>
              <li className="side-drawer__list-item">
                <NavLink to="" onClick={this.onLogOutClick}>
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="side-drawer__list-item">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="side-drawer__list-item">
                <NavLink to="/register">Sign Up</NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    );
  }
}

SideDrawer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logOutUser,
  clearCurrentProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideDrawer);
