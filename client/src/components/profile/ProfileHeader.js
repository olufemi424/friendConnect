import React, { Component } from "react";
import isEmpty from "../../store/validation/is-Empty";
import PropTypes from "prop-types";

// SVGs
import facebook from "../../img/SVG/facebook-with-circle.svg";
import twitter from "../../img/SVG/twitter.svg";
import instagram from "../../img/SVG/instagram.svg";
import linkedin from "../../img/SVG/linkedin.svg";
import sphere from "../../img/SVG/sphere.svg";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile__header">
        {/* <!-- <div className="bread">
          <div className="light breadcrumb">
            <div className="breadcrumb">
              <a href="index.html">Home</a>
              <a href="dashboard.html">My Profile</a>
            </div>
          </div>
          </div> --> */}

        <div className="box-1">
          <div className="profile-user__info">
            <img
              className="profile-user__info__image"
              src={profile.user.avatar}
              alt={profile.user.name}
            />

            <div className="profile-user__info__details">
              <div className="profile-user__info__details--box">
                <h1 className="heading-tertiary--main margin-right--sm">
                  {profile.user.name}
                </h1>
                <p className="heading-tertiary--sub margin-right--sm">
                  {profile.status}{" "}
                  {isEmpty(profile.company) ? null : (
                    <span>
                      {" "}
                      <span className="color-secondary">at </span>
                      {profile.company}
                    </span>
                  )}
                </p>

                {isEmpty(profile.location) ? null : (
                  <p className="heading-tertiary--sub margin-right--sm">
                    {profile.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="box-2">
          <div className="empty-box" />
          <div className="profile-user__social">
            {isEmpty(profile.website) ? null : (
              <a
                className="profile-user__social--link"
                href={profile.website}
                target="noopener"
              >
                <img
                  className="profile-user__social--icon"
                  src={sphere}
                  alt="sphere"
                />
              </a>
            )}
            {isEmpty(profile.social) ? null : (
              <a
                className="profile-user__social--link"
                href={profile.social.facebook}
                target="noopener"
              >
                <img
                  className="profile-user__social--icon"
                  src={facebook}
                  alt="facebook"
                />
              </a>
            )}
            {isEmpty(profile.social) ? null : (
              <a
                className="profile-user__social--link"
                href={profile.social.linkedin}
                target="noopener"
              >
                <img
                  className="profile-user__social--icon"
                  src={linkedin}
                  alt="linkedin"
                />
              </a>
            )}
            {isEmpty(profile.social) ? null : (
              <a
                className="profile-user__social--link"
                href={profile.social.twitter}
                target="noopener"
              >
                <img
                  className="profile-user__social--icon"
                  src={twitter}
                  alt="twitter"
                />
              </a>
            )}
            {isEmpty(profile.social) ? null : (
              <a
                className="profile-user__social--link"
                href={profile.social.instagram}
                target="noopener"
              >
                <img
                  className="profile-user__social--icon"
                  src={instagram}
                  alt="instagram"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
