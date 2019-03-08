import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { registerUser } from "../../store/actions/authActions";
import TextFieldGroup from "../../common/TextFieldGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="signup">
        <h1 className="login__header heading-primary--main">Sign Up</h1>
        <p className="heading-secondary margin-bottom--md">
          Join and connect with other Developers for free.
        </p>
        <div className="login__form">
          <form noValidate onSubmit={this.handleSubmit}>
            <TextFieldGroup
              placeholder="Full Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              label="Full Name"
              error={errors.name}
            />
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              error={errors.email}
              label="Email Address"
              info="This site uses Gravatar so if you want a profile image, use a
                  Gravatar email"
            />

            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              error={errors.password}
              label="Password"
            />

            <TextFieldGroup
              placeholder="Confirm Password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.handleChange}
              error={errors.password2}
              label="Confirm Password"
            />
            <input type="submit" value="Sign Up" className="btn btn--green" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (newUser, history) => dispatch(registerUser(newUser, history))
  };
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
