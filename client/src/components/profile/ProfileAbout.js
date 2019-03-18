import React, { Component } from "react";
import isEmpty from "../../store/validation/is-Empty";
import PropTypes from "prop-types";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //GET FIRST NAME
    const firstName = profile.user.name.trim().split(" ")[0];

    //SKILL LIST
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="profile-user__info--skills--list">
        {skill}
      </div>
    ));
    return (
      <React.Fragment>
        <div className="profile-user__info--bio">
          <h3 className="profile-user__info--bio--title">{firstName}'s Bio</h3>
          <p className="profile-user__info--bio--body">
            {isEmpty(profile.bio) ? (
              <span>{firstName} does not have a bio</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>
        </div>
        <div className="profile-user__info--skills">
          <h3 className="profile-user__info--skills-title">Skills</h3>
          <div className="profile-user__info--skills-box">{skills}</div>
        </div>
      </React.Fragment>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
