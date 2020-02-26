import React, { Component } from "react";
import "./sass/style.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./store/utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./store/actions/authActions";
import { clearCurrentProfile } from "./store/actions/profileActions";
import { Provider } from "react-redux";
import store from "./store/store";

import PrivateRoute from "../src/common/PrivateRoute";

import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer";
import PageNotFound from "./components/layout/PageNotFound";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/not-found/NotFound";

//ON LOAD OF THE APP, CHECK FOR AUTHENTICATION
if (localStorage.jwtToken) {
	//SET AUTH TOKEN TO HEADER AUTH
	setAuthToken(localStorage.jwtToken);
	//DECODE TOKEN AND GET USER INFO AND EXPIRATION
	const decoded = jwt_decode(localStorage.jwtToken);
	//SET USER AND isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	//CHECK FOR EXPIRED TOKEN AND REDIRECT TO LOGIN IF EXPIRED
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//LOG USER OUT
		store.dispatch(logOutUser());
		//CLEAR CURRENT PROFILE
		store.dispatch(clearCurrentProfile());
		//REDIRECT TO LOGIN
		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router basename="/">
					<div className="App">
						<Navbar />
						<main className="main">
							<Switch>
								<Route path="/" exact component={Landing} />
								<Route path="/register" component={Register} />
								<Route path="/login" component={Login} />
								<Route path="/profiles" component={Profiles} />
								<Route path="/profile/:handle" component={Profile} />
								<PrivateRoute path="/dashboard" component={Dashboard} />
								<PrivateRoute
									path="/create-profile"
									component={CreateProfile}
								/>
								<PrivateRoute path="/edit-profile" component={EditProfile} />
								<PrivateRoute
									path="/add-experience"
									component={AddExperience}
								/>
								<PrivateRoute path="/add-education" component={AddEducation} />
								<PrivateRoute path="/post/:id" component={Post} />
								<PrivateRoute path="/feed" component={Posts} />
								<Route path="/not-found" component={NotFound} />
								<Route component={PageNotFound} />
							</Switch>
						</main>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
