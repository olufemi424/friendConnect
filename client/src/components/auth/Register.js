import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { registerUser } from "../../store/actions/authActions";
import TextFieldGroup from "../../common/TextFieldGroup";

const Register = props => {
	const [inputs, updateInputs] = useState({
		name: "",
		email: "",
		password: "",
		password2: ""
	});
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (props.auth.isAuthenticated) {
			props.history.push("/dashboard");
		}
		if (props.errors) {
			setErrors(props.errors);
		}
	}, [props.errors, props.auth.isAuthenticated]);

	const handleChange = e => {
		updateInputs({
			...inputs,
			[e.target.name]: e.target.value
		});
		setErrors({});
	};

	const handleSubmit = e => {
		e.preventDefault();
		const newUser = {
			name: inputs.name,
			email: inputs.email,
			password: inputs.password,
			password2: inputs.password2
		};
		props.registerUser(newUser, props.history);
	};

	return (
		<div className="signup">
			<h1 className="heading-secondary--main">Sign Up</h1>
			<p className="heading-secondary--sub margin-bottom--md">
				Join and connect with other Developers.
			</p>
			<div className="login__form">
				<form noValidate onSubmit={handleSubmit}>
					<TextFieldGroup
						placeholder="Full Name"
						name="name"
						value={inputs.name}
						onChange={handleChange}
						label="Full Name"
						error={errors.name}
					/>
					<TextFieldGroup
						placeholder="Email Address"
						name="email"
						type="email"
						value={inputs.email}
						onChange={handleChange}
						error={errors.email}
						label="Email Address"
						info="This site uses Gravatar so if you want a profile image, use a
                  Gravatar email"
					/>

					<TextFieldGroup
						placeholder="Password"
						name="password"
						type="password"
						value={inputs.password}
						onChange={handleChange}
						error={errors.password}
						label="Password"
					/>

					<TextFieldGroup
						placeholder="Confirm Password"
						name="password2"
						type="password"
						value={inputs.password2}
						onChange={handleChange}
						error={errors.password2}
						label="Confirm Password"
					/>
					<input
						type="submit"
						value="Sign Up For FREE"
						className="btn btn--form"
					/>
				</form>
			</div>
		</div>
	);
};

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
