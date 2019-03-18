import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../store/actions/profileActions";

// scv
import trash from "../../img/SVG/trash.svg";

class Education extends Component {
  handleClick = id => {
    if (window.confirm("Are You Sure ?")) {
      this.props.deleteEducation(id);
    }
  };

  render() {
    let education;

    if (this.props.education) {
      education = this.props.education.map(edu => (
        <div className="credentials__card" key={edu._id}>
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
              {" - "}
              {edu.to === null ? (
                " Till Present"
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
          <button
            className="credentials__delete-btn"
            onClick={this.handleClick.bind(this, edu._id)}
          >
            <img
              className="credentials__icon-delete"
              src={trash}
              alt="delete button"
            />
          </button>
        </div>
      ));
    }
    return (
      <div className="credentials-section">
        <h4 className="heading-tertiary--main">Education Credentials</h4>
        <div className="credentials">{education}</div>
      </div>
    );
  }
}

Education.protoType = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
