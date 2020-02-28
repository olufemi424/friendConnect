import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import TextFieldGroup from "../../common/TextFieldGroup";
import InputGroup from "../../common/InputGroup";
import SelectListGroup from "../../common/SelectListGroup";
import {
	createProfile,
	getCurrentProfile
} from "../../store/actions/profileActions";
import isEmpty from "../../store/validation/is-Empty";

// SVGs
import facebook from "../../img/SVG/facebook-with-circle.svg";
import twitter from "../../img/SVG/twitter.svg";
import instagram from "../../img/SVG/instagram.svg";
import linkedin from "../../img/SVG/linkedin.svg";
import youtube from "../../img/SVG/youtube.svg";

class EditProfile extends Component {
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

	componentDidMount() {
		this.props.getCurrentProfile();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;

			//bring skills array back to CSV
			let skillCSV;
			if (typeof profile.skills === "object") {
				skillCSV = profile.skills.join(",");
			}

			//if profile filed doesnt exist, make empty string
			profile.company = !isEmpty(profile.company) ? profile.company : "";
			profile.website = !isEmpty(profile.website) ? profile.website : "";
			profile.location = !isEmpty(profile.location) ? profile.location : "";
			profile.skills = !isEmpty(profile.skills) ? skillCSV : "";
			profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.twitter = !isEmpty(profile.social.twitter)
				? profile.social.twitter
				: "";
			profile.facebook = !isEmpty(profile.social.facebook)
				? profile.social.facebook
				: "";
			profile.linkedin = !isEmpty(profile.social.linkedin)
				? profile.social.linkedin
				: "";
			profile.youtube = !isEmpty(profile.social.youtube)
				? profile.social.youtube
				: "";
			profile.instagram = !isEmpty(profile.social.instagram)
				? profile.social.instagram
				: "";

			// set component field state
			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: profile.skills,
				bio: profile.bio,
				githubusername: profile.githubusername,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				youtube: profile.youtube,
				instagram: profile.instagram
			});
		}
	}

	handleOnChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
			errors: ""
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		//get state
		const profileData = {
			...this.state
		};
		//history
		const history = this.props.history;

		// let handle = this.state.handle;
		// const profileHandle = this.props.profile.profile.handle;
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
						pattern="https?://.+"
					/>
					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon={facebook}
						value={this.state.facebook}
						onChange={this.handleOnChange}
						error={errors.facebook}
						pattern="https?://.+"
					/>
					<InputGroup
						placeholder="LinkedIn Profile URL"
						name={linkedin}
						icon={linkedin}
						value={this.state.linkedin}
						onChange={this.handleOnChange}
						error={errors.linkedin}
						pattern="https?://.+"
					/>
					<InputGroup
						placeholder="Youtube Profile URL"
						name="youtube"
						icon={youtube}
						value={this.state.youtube}
						onChange={this.handleOnChange}
						error={errors.youtube}
						pattern="https?://.+"
					/>
					<InputGroup
						placeholder="Instagram Profile URL"
						name="instagram"
						icon={instagram}
						value={this.state.instagram}
						onChange={this.handleOnChange}
						error={errors.instagram}
						pattern="https?://.+"
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
			<div className="edit-profile">
				<div className="container">
					<div className="light breadcrumb--box">
						<div className="breadcrumb">
							<Link to="/dashboard">Dashboard</Link>
							<Link to="">Edit Profile</Link>
						</div>
					</div>
					<div className="dashboard__text--box">
						<h2 className="heading-secondary--main text-center">
							Edit Your Profile
						</h2>
						<p className="heading-tertiary--main text-center">
							Please update your profile
						</p>
						<small className="small--text-int">* = required field</small>
					</div>
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
								className="btn btn-form"
								type="button"
								onClick={() => {
									this.setState(prevState => ({
										dispplaySocialInputs: !prevState.dispplaySocialInputs
									}));
								}}
							>
								Update Social Network Links{" "}
								<i
									className="fa fa-chevron-down text-info"
									aria-hidden="true"
								/>
							</button>
							<span className="small--text-int">(Optional)</span>
						</div>
						{socialInputs}
						<input
							type="submit"
							value="Update Profile"
							className="btn btn--form margin-top--lg"
						/>
					</form>
				</div>
			</div>
		);
	}
}

EditProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

const mapDispatchToProps = dispatch => ({
	createProfile: (prevState, history) =>
		dispatch(createProfile(prevState, history)),
	getCurrentProfile: () => dispatch(getCurrentProfile())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(EditProfile));
