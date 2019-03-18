import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../store/actions/profileActions";
import { clearErrors } from "../../store/actions/postActions";

class AddExperience extends Component {
  state = {
    company: "",
    title: "",
    location: "",
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
    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(expData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="experience">
        <div className="light breadcrumb--box">
          <div className="breadcrumb">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="">Add Experience</Link>
          </div>
        </div>
        <div className="dashboard__text--box">
          <h2 className="heading-tertiary--main text-center">Add Experience</h2>
          <p className="heading-tertiary--sub text-center">
            Add any job or position that you have had in the past
          </p>
          <small className="small--text-int">* = required field</small>
        </div>
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup
            placeholder="* Company"
            name="company"
            value={this.state.company}
            onChange={this.handleOnChange}
            error={errors.company}
            label="Company"
          />
          <TextFieldGroup
            placeholder="* Job Title"
            name="title"
            value={this.state.title}
            onChange={this.handleOnChange}
            error={errors.title}
            label="Job Title"
          />
          <TextFieldGroup
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.handleOnChange}
            error={errors.location}
            label="Location"
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
            placeholder="Job Description"
            name="description"
            value={this.state.description}
            onChange={this.handleOnChange}
            error={errors.description}
            label="Tell us a little about the position"
          />
          <input
            type="submit"
            value="Add"
            className="btn btn--form margin-top--md "
          />
        </form>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = {
  addExperience,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience));
