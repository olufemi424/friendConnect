import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../store/actions/profileActions";
import { clearErrors } from "../../store/actions/postActions";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.props.clearErrors();
  };

  handleCheck = e => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  };

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return { errors: props.errors };
    }
    return null;
  }

  handleSubmit = e => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(eduData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="education">
        <div className="container">
          <div className="light breadcrumb--box">
            <div className="breadcrumb">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="">Add Education</Link>
            </div>
          </div>

          <div className="dashboard__text--box">
            <h2 className="heading-secondary--main text-center">
              Add Education
            </h2>
            <p className="heading-tertiary--main text-center">
              Let's get some information about your education.
            </p>
            <small className="small--text-int">* = required field</small>
          </div>
          <form onSubmit={this.handleSubmit}>
            <TextFieldGroup
              placeholder="* School Name"
              name="school"
              value={this.state.school}
              onChange={this.handleOnChange}
              error={errors.school}
              label="* School Name"
            />
            <TextFieldGroup
              placeholder="* Degree or Certification"
              name="degree"
              value={this.state.degree}
              onChange={this.handleOnChange}
              error={errors.degree}
              label="* Degree or Certification"
            />
            <TextFieldGroup
              placeholder="Field Of Study"
              name="fieldOfStudy"
              value={this.state.fieldOfStudy}
              onChange={this.handleOnChange}
              error={errors.fieldOfStudy}
              label="Field Of Study"
            />
            <h6>From Date</h6>
            <TextFieldGroup
              placeholder="From"
              type="date"
              name="from"
              value={this.state.from}
              onChange={this.handleOnChange}
              error={errors.from}
            />
            <h6>To Date</h6>
            <TextFieldGroup
              placeholder="to"
              type="date"
              name="to"
              value={this.state.to}
              onChange={this.handleOnChange}
              error={errors.to}
              disabled={this.state.disabled ? "disabled" : ""}
            />
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                name="current"
                value={this.state.current}
                checked={this.state.current}
                onChange={this.handleCheck}
                id="current"
              />
              <label htmlFor="current" className="form-check-label">
                Current Job
              </label>
            </div>
            <TextAreaFieldGroup
              placeholder="Tell us your program..."
              name="description"
              value={this.state.description}
              onChange={this.handleOnChange}
              error={errors.description}
              label="Tell us your program"
            />
            <input type="submit" value="Add" className="btn btn--form" />
          </form>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = {
  addEducation,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));
