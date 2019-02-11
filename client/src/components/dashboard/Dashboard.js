import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "../../store/actions/profileActions";
import Spinner from "../../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleDelete = e => {
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    // if (!isAuthenticated) return <Redirect to="/" />;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if login user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <div style={{ marginBottom: "60px" }}>
              <button onClick={this.handleDelete} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        //user is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead">Welcome {user.name}</p>
            <p>You have not setup a profile, pls add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  getCurrentProfile: () => dispatch(getCurrentProfile()),
  deleteAccount: () => dispatch(deleteAccount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
