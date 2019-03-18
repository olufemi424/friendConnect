import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SideDrawer = props => {
  let drawerClasses = ["side-drawer"];

  const { isAuthenticated } = props.auth;

  if (props.show) {
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
              <NavLink to="">Logout</NavLink>
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
};

SideDrawer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SideDrawer);
