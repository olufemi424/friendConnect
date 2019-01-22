import { GET_ERRORS } from "./types";
import axios from "axios";

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
      // localStorage.setItem("jwtToekn", token);
      //set token to auth header
      // setAuthToekn(token);
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
