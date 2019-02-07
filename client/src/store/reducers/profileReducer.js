import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

//INITIAL PROFILE STATE STORE
const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

//SWITCH CASES TESTING FOR ACTIONS TYPES TO UPDATE THE STORE
export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_ERRORS:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
