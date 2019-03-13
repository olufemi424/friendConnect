import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../store/validation/is-Empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="main-profile">
        <Link
          to={`/profile/${profile.handle}`}
          className="main-profile__btn btn-text"
        >
          View Profile
        </Link>
        <div className="main-profile__card">
          <div className="main-profile__image-box">
            <img
              className="main-profile__image"
              src={profile.user.avatar}
              alt={profile.handle}
            />
          </div>

          <div className="main-profile__info-box">
            <h3 className="heading-tertiary--main">{profile.user.name}</h3>
            <p className="main-profile__title">
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span className="main-profile__title--span">
                  at {profile.company}
                </span>
              )}
            </p>
            <p className="main-profile__address">
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
          </div>

          <div className="main-profile-skill">
            <h4 className="main-profile-skill__heading">Skill Set</h4>
            <ul className="main-profile-skill__list">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="main-profile-skill__list--item">
                  <i className="main-profile-skill__list--item-icon" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
