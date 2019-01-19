import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errosReducers from "./errosReducers";

export default combineReducers({
  auth: authReducer,
  errors: errosReducers
});
