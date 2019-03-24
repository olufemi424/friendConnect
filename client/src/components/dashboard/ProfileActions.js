import React from "react";
import { Link } from "react-router-dom";

// SVGs
import study from "../../img/SVG/icon-study.svg";
import userplus from "../../img/SVG/icon-user-plus.svg";
import briefcase from "../../img/SVG/briefcase.svg";

const ProfileActions = () => {
  return (
    <div className="dashboard-menu" role="group">
      {/* <Link to="/edit-profile" className="dashboard-menu__link">
        <img
          className="dashboard-menu__icon"
          src={userplus}
          alt="user icon plus"
        />

        <div className="dashborad-menu__name">
          Edit <span className="dashboard-menu--green">Profile</span>
        </div>
      </Link>
      <Link to="/add-experience" className="dashboard-menu__link">
        <img
          className="dashboard-menu__icon"
          src={briefcase}
          alt="user icon plus"
        />
        <div className="dashborad-menu__name">
          Add <span className="dashboard-menu--green">Experience</span>
        </div>
      </Link>
      <Link to="/add-education" className="dashboard-menu__link">
        <img
          className="dashboard-menu__icon"
          src={study}
          alt="user icon plus"
        />
        <div className="dashborad-menu__name">
          Add <span className="dashboard-menu--green">Education</span>
        </div>
      </Link> */}

      {/* <Link to="/add-education" className="dashboard-menu__link">
        <img
          className="dashboard-menu__icon"
          src={study}
          alt="user icon plus"
        />
        <div className="dashborad-menu__name">
          Add <span className="dashboard-menu--green">Image</span>
        </div>
      </Link> */}
    </div>
  );
};

export default ProfileActions;
