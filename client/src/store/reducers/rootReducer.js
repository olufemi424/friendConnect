import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errosReducers from "./errosReducers";
import profileReducer from "./profileReducer";

//COMBINE STORE STATE
export default combineReducers({
  auth: authReducer,
  errors: errosReducers,
  profile: profileReducer
});
