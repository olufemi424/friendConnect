import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./store/utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./store/actions/authActions";
import { clearCurrentProfile } from "./store/actions/profileActions";
import { Provider } from "react-redux";
import store from "./store/store";

import PrivateRoute from "../src/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
// import NotFound from "./components/layout/NotFound";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";

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
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
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
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
