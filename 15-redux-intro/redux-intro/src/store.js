import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

//USING THE REDUX TOOLKIT:
//  configureStore will automatically:
//  combine the reducers,
// add the thunk middleware ,
//  setup the devtools
// in the end the store is created and returned

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
