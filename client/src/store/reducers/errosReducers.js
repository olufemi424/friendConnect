import { GET_ERRORS } from "../actions/types";

//INITIAL ERROR STATE OF STORE
const initialState = {};

//SWITCH CASES TESTING FOR ACTIONS TYPES TO UPDATE THE STORE
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
