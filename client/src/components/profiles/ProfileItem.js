import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../store/validation/is-Empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div class="main-profile">
        <Link to={`/profile/${profile.handle}`} className="main-profile__btn">
          View Profile
        </Link>
        <div class="main-profile__card">
          <div class="main-profile__image-box">
            <img
              class="main-profile__image"
              src={profile.user.avatar}
              alt={profile.handle}
            />
          </div>

          <div class="main-profile__info-box">
            <h3 class="main-profile__name">{profile.user.name}</h3>
            <p class="main-profile__title">
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span className="main-profile__title--span">
                  at {profile.company}
                </span>
              )}
            </p>
            <p class="main-profile__address">
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
          </div>

          <div class="main-profile-skill">
            <h4 class="main-profile-skill__heading">Skill Set</h4>
            <ul class="main-profile-skill__list">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} class="main-profile-skill__list--item">
                  <i class="main-profile-skill__list--item-icon" />
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
