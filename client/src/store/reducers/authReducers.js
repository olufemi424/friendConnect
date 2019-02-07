import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../validation/is-Empty";

//INITIAL AUTH STATE OF STORE
const initialState = {
  isAuthenticated: false,
  user: {}
};

//SWITCH CASES TESTING FOR ACTIONS TYPES TO UPDATE THE STORE
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
