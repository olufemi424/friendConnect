import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Landing = props => {
	useEffect(() => {
		if (props.auth.isAuthenticated) {
			props.history.push("/dashboard");
		}
	}, []);

	return (
		<div className="landing">
			<h1 className="heading-primary--main">DevFConnect</h1>
			<p className="heading-primary--sub">
				{" "}
				Create a profile and connect with new people.
			</p>
			<div className="landing__link">
				<Link to="/login" className="btn btn--login btn--animated-movinleft">
					Login
				</Link>
				<Link
					to="/register"
					className="btn btn--signup btn--animated-movinbottom"
				>
					Sign Up For FREE
				</Link>
			</div>
		</div>
	);
};

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Landing);
