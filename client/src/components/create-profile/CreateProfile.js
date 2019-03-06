import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import InputGroup from "../../common/InputGroup";
import SelectListGroup from "../../common/SelectListGroup";
import { createProfile } from "../../store/actions/profileActions";

// SVGs
import facebook from "../../img/SVG/facebook-with-circle.svg";
import twitter from "../../img/SVG/twitter.svg";
import instagram from "../../img/SVG/instagram.svg";
import linkedin from "../../img/SVG/linkedin.svg";
import youtube from "../../img/SVG/youtube.svg";

class CreateProfile extends Component {
  state = {
    dispplaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    const history = this.props.history;
    this.props.createProfile(profileData, history);
  };

  render() {
    const { errors, dispplaySocialInputs } = this.state;
    let socialInputs;
    if (dispplaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon={twitter}
            value={this.state.twitter}
            onChange={this.handleOnChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon={facebook}
            value={this.state.facebook}
            onChange={this.handleOnChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon={linkedin}
            value={this.state.linkedin}
            onChange={this.handleOnChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon={youtube}
            value={this.state.youtube}
            onChange={this.handleOnChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon={instagram}
            value={this.state.instagram}
            onChange={this.handleOnChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor", value: "Instructor" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile">
        <Link to="/dashboard" className="btn btn--back">
          Back
        </Link>
        <h2 className="heading-primary--main">Create Profile</h2>
        <p className="heading-secondary">
          Let's get some information to make your profile stand out
        </p>
        <small className="small--text-int">* = required field</small>
        <form onSubmit={this.handleSubmit} className="form ">
          <TextFieldGroup
            placeholder="* Profile Handle"
            name="handle"
            value={this.state.handle}
            onChange={this.handleOnChange}
            error={errors.handle}
            label="A unique handle for your profile URL. Your full name, company name, nickname"
          />
          <SelectListGroup
            placeholder="Status"
            name="status"
            value={this.state.status}
            onChange={this.handleOnChange}
            error={errors.status}
            options={options}
            info="Give us an idea of where you are at in your career"
          />
          <TextFieldGroup
            placeholder="Skills"
            name="skills"
            value={this.state.skills}
            onChange={this.handleOnChange}
            error={errors.skills}
            label="Please use comma separated values (eg. HTML,CSS,JavaScript, PHP"
          />
          <TextFieldGroup
            placeholder="Github Username"
            name="githubusername"
            value={this.state.githubusername}
            onChange={this.handleOnChange}
            error={errors.githubusername}
            label="If you want your latest repos and a github link, include your username"
          />
          <TextFieldGroup
            placeholder="Company"
            name="company"
            value={this.state.company}
            onChange={this.handleOnChange}
            error={errors.company}
            label="Could be your own company or one you work for"
          />
          <TextFieldGroup
            placeholder="Website"
            name="website"
            value={this.state.website}
            onChange={this.handleOnChange}
            error={errors.website}
            label="Could be your own website or one you work for"
          />

          <TextFieldGroup
            placeholder="Location"
            name="location"
            value={this.state.location}
            onChange={this.handleOnChange}
            error={errors.location}
            label="City or city &amp; state suggested(eg. Chicago, IL)"
          />

          <TextAreaFieldGroup
            placeholder="Short Bio"
            name="bio"
            value={this.state.bio}
            onChange={this.handleOnChange}
            error={errors.bio}
            label="Tell us a little about yourself"
          />
          <div className="">
            <button
              type="button"
              onClick={() => {
                this.setState(prevState => ({
                  dispplaySocialInputs: !prevState.dispplaySocialInputs
                }));
              }}
              className="btn btn--form"
            >
              Add Social Network Links
              <i className="fa fa-chevron-down text-info" aria-hidden="true" />
            </button>
            <span className="small--text-int">(Optional)</span>
          </div>
          {socialInputs}
          <input
            type="submit"
            value="Create Profile"
            className="btn btn--green margin-top--md "
          />
        </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  createProfile: (prevState, history) =>
    dispatch(createProfile(prevState, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateProfile));
