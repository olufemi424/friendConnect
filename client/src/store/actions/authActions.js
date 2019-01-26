import axios from "axios";
import setAuthToekn from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  //POST NEW USER
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login - Get user Token
export const loginUser = userData => dispatch => {
  axios
    .post(".api/user/login", userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem("jwtToekn", token);
      //set token to auth header
      setAuthToekn(token);
      //decode token to get use data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//set Logged in user

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
