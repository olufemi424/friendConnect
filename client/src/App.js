import React, { Component } from "react";
import "./App.css";
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
// import PageNotFound from "./components/layout/PageNotFound";
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
        <Router>
          <div className="App">
            <Navbar />

            {/* <Route component={PageNotFound} /> */}

            <main className="main">
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />

                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />

                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />

                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />

                <PrivateRoute exact path="/post/:id" component={Post} />

                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </main>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
