import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../store/actions/profileActions";

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
    console.log(this.state);
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any School that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.handleOnChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.handleOnChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="Field Of Study"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={this.handleOnChange}
                  error={errors.fieldOfStudy}
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
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleOnChange}
                  error={errors.description}
                  info="Tell us your program"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
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

const mapDispatchToProps = dispatch => ({
  addEducation: (data, history) => dispatch(addEducation(data, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));
