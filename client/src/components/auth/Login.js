import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";
import TextFieldGroup from "../../common/TextFieldGroup";

const Login = props => {
	const [inputs, updateInputs] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (props.auth.isAuthenticated) {
			props.history.push("/dashboard");
		}

		if (props.errors) {
			setErrors(props.errors);
		}
	}, [props.auth.isAuthenticated, props.errors]);

	const hanleSubmit = e => {
		e.preventDefault();
		const userData = {
			email: inputs.email,
			password: inputs.password
		};
		props.loginUser(userData);
	};

	const handleChange = e => {
		updateInputs({
			...inputs,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className="login">
			<h1 className="heading-secondary--main">Log In</h1>
			<p className="heading-secondary--sub margin-bottom--lg">
				Sign in and start connecting.
			</p>
			<div className="login__form">
				<form onSubmit={hanleSubmit} className="form">
					<TextFieldGroup
						placeholder="Email Address"
						name="email"
						type="email"
						value={inputs.email}
						onChange={handleChange}
						error={errors.email}
						label="Email Address"
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
					<input
						type="submit"
						value="Log In"
						className="btn btn--form margin-top--sm"
					/>
				</form>
			</div>
		</div>
	);
};

Login.propTypes = {
	loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

const mapDispatchToProps = dispatch => {
	return {
		loginUser: user => dispatch(loginUser(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
