import axios from "axios";
import setAuthToekn from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// REGISTER USER
export const registerUser = (userData, history) => dispatch => {
  //POST NEW USER
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//LOGIN - GET USER AUTHENTICATION
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // GET TOKEN FROM RESPONSE
      const { token } = res.data;
      //SET TOKEN TO LOCAL STORAGE
      localStorage.setItem("jwtToken", token);
      //SET TOKEN TO AUTH HEADER
      setAuthToekn(token);
      //DECODE TOKEN TO GET USER DATA
      const decoded = jwt_decode(token);
      //SET CURRENT USER
      dispatch(setCurrentUser(decoded));
    })
    .catch((
      err //CATCH ERROR
    ) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//SET LOGGEDIN USER TO CURRENT USER IN STORE
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//LOGOUT USER

export const logOutUser = history => dispatch => {
  //REMOVE TOKEN FROM LOCAL STORAGE
  localStorage.removeItem("jwtToken");
  //REMOVE AUTH HEADER FROM FUTURE REQUEST
  setAuthToekn(false);

  //ROUTE TO HOME -
  history.push("/login");

  //SET CURRENT USER TO EMPTY OBJECT IN STORE - which will set isAuthenticated to fale
  dispatch(setCurrentUser({}));
};
