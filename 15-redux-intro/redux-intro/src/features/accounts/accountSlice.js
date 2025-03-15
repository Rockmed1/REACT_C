import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

//createSlices gives us THREE big benefits:
//1)Automatically create action creators from our reducers
//2)No more switch statement in the reducer and the default case is automatically handled
//3)We can now mutate the state inside the reducers
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload; //RTK allows the reducer to mutate the state
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      //to pass a payload with multiple arguments: ( the other option is to pass an object as a payload to avoid this)
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return; //here we just return (vs. return state)
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

//this is easier than using the RTK way of implementing THUNK. for this to work it has to have the same name ("deposit") and the action type is in the same format: <sliceName>/<reducer> => "account/deposit"
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //in THUNK we have to return a function
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });

    //API call
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${currency}&symbols=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    //return action
    dispatch({ type: "account/deposit", payload: converted });
  };
}
