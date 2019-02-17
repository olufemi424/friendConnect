import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../store/actions/profileActions";

class Experience extends Component {
  handleClick = id => {
    if (window.confirm("Are You Sure ?")) this.props.deleteEducation(id);

    this.props.deleteExperience(id);
  };

  render() {
    let experience;

    if (this.props.experience) {
      experience = this.props.experience.map(exp => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
            {exp.to === null ? (
              "Now"
            ) : (
              <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
          </td>
          <td>
            {" "}
            <button
              onClick={this.handleClick.bind(this, exp._id)}
              className="btn btn-danger"
            >
              &times;
            </button>{" "}
          </td>
        </tr>
      ));
    }
    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <tbody>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </tbody>
        </table>
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
