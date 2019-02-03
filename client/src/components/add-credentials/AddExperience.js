import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
  };

  handleCheck = e => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleOnChange}
                  errors={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleOnChange}
                  errors={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleOnChange}
                  errors={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  placeholder="From"
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.handleOnChange}
                  errors={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  placeholder="to"
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.handleOnChange}
                  errors={errors.to}
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
                  info="Tell us a little about the position"
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

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

// const mapDispatchToProps = dispatch => ({
//   createProfile: (prevState, history) =>
//     dispatch(createProfile(prevState, history)),
//   getCurrentProfile: () => dispatch(getCurrentProfile())
// });

export default connect(mapStateToProps)(withRouter(AddExperience));
