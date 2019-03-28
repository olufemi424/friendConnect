import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/rootReducer";

//GLOBAL INITIAL STATE
const initialState = {};
const middleware = [thunk];

//CREATE GLOBAL STORE FROM ROOT REDUCER AND ALLOW FUNCTION DISPATH WITH THUNK
const store = createStore(
  rootReducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
