import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../store/actions/profileActions";

class Education extends Component {
  handleClick = id => {
    if (window.confirm("Are You Sure ?")) this.props.deleteEducation(id);
  };

  render() {
    console.log(this.props.education);
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          {" "}
          <button
            onClick={this.handleClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            &times;
          </button>{" "}
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <tbody>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </tbody>
        </table>
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
