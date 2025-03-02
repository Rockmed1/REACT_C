import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// import { applyMiddleware, combineReducers, createStore } from "redux";
// import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// // this is the only file we are really using redux. the purpose here is to create the store and export it to be injected and used later in the application.
// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))

// );

//using the redux toolkit

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
