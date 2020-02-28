import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers/rootReducer";

//GLOBAL INITIAL STATE
const initialState = {};
const middleware = [thunk];
const devtools =
	process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION__ &&
		  window.__REDUX_DEVTOOLS_EXTENSION__()
		: "";

//CREATE GLOBAL STORE FROM ROOT REDUCER AND ALLOW FUNCTION DISPATH WITH THUNK
const store = createStore(
	rootReducers,
	initialState,
	compose(applyMiddleware(...middleware), devtools)
);

export default store;
