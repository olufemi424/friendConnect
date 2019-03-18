import React, { Component } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    //LIST OF EXP AND EDU INTO VARIABLES
    const expItems = experience.map(exp => (
      <div key={exp._id} className="credentials__card">
        <ul className="credentials__card--details">
          <li className="credentials__card--details--item">
            <span className="credentials--span">{exp.company} </span>
          </li>
          <li className="credentials__card--details--item">
            <span className="credentials--span">Title: </span> {exp.title}
          </li>
          <li className="credentials__card--details--item">
            <span className="credentials--span">Years: </span>
            <Moment format="MM-DD-YYYY">{exp.from}</Moment>
            {exp.to === null ? (
              " till Present"
            ) : (
              <Moment format="MM-DD-YYYY">{exp.to}</Moment>
            )}
          </li>
          <li className="credentials__card--details--item">
            {exp.description === "" ? null : (
              <span>
                <span className="credentials--span">Description: </span>
                <span>{exp.description}</span>
              </span>
            )}
          </li>
        </ul>
      </div>
    ));

    const eduItems = education.map(edu => (
      <div key={edu._id} className="credentials__card">
        <ul className="credentials__card--details">
          <li className="credentials__card--details--item">
            <span className="credentials--span">{edu.school}</span>
          </li>
          <li className="credentials__card--details--item">
            <span className="credentials--span">Degree: </span> {edu.degree}
          </li>
          <li className="credentials__card--details--item">
            <span className="credentials--span">Years: </span>{" "}
            <Moment format="MM-DD-YYYY">{edu.from}</Moment>
            {edu.to === null ? (
              " till Present"
            ) : (
              <Moment format="MM-DD-YYYY">{edu.to}</Moment>
            )}
          </li>
          <li className="credentials__card--details--item">
            {edu.description === "" ? null : (
              <span>
                <span className="credentials--span">Description: </span>
                <span>{edu.description}</span>
              </span>
            )}
          </li>
        </ul>
      </div>
    ));

    return (
      <React.Fragment>
        {/* EDUCATION CREDS */}
        <div className="credentials-section">
          <h4 className="heading-tertiary--main">Education Credentials</h4>
          <hr className="margin-bottom--md margin-top--md" />
          {expItems.length > 0 ? (
            <div className="credentials">{eduItems}</div>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>

        <hr className="margin-bottom--md margin-top--md" />

        {/* EXPERIENCE CREDS */}
        <div className="credentials-section">
          <h4 className="heading-tertiary--main">Experience Credentials</h4>
          <hr className="margin-bottom--md margin-top--md" />
          {eduItems.length > 0 ? (
            <div className="credentials">{expItems}</div>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
          <hr className="margin-bottom--md margin-top--md" />
        </div>
      </React.Fragment>
    );
  }
}

ProfileCreds.propTypes = {
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired
};

export default ProfileCreds;
