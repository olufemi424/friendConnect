import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../store/actions/profileActions";

// svg
import trash from "../../img/SVG/trash.svg";

class Experience extends Component {
  handleClick = id => {
    if (window.confirm("Are You Sure ?")) this.props.deleteExperience(id);
  };

  render() {
    let experience;

    if (this.props.experience) {
      experience = this.props.experience.map(exp => (
        <div className="credentials__card" key={exp._id}>
          <ul className="credentials__card--details">
            <li className="credentials__card--details--item">
              <span className="credentials--span">Company: </span> {exp.company}
            </li>
            <li className="credentials__card--details--item">
              <span className="credentials--span">Title: </span> {exp.title}
            </li>
            <li className="credentials__card--details--item">
              <span className="credentials--span">Years: </span>{" "}
              <Moment format="MM/DD/YYYY">{exp.from}</Moment> -{" "}
              {exp.to === null ? (
                "Now"
              ) : (
                <Moment format="YYYY/MM/DD">{exp.to}</Moment>
              )}
            </li>
          </ul>
          <button
            className="credentials__delete-btn"
            onClick={this.handleClick.bind(this, exp._id)}
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
        <h4 className="heading-tertiary">Experience Credentials</h4>
        <div className="credentials">{experience}</div>
      </div>
    );
  }
}

Experience.protoType = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
