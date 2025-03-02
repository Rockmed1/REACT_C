import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
//ACTION CREATORS

// We can use this method in order to avoid typing strings in the dispatch function
const actions = {
  account_deposit: "account/deposit",
  account_withdraw: "account/withdraw",
  account_requestLoan: "account/requestLoan",
  account_payloan: "account/payLoan",
};

// The Redux way is creating an action creator function
function deposit(amount) {
  return { type: actions.account_deposit, payload: amount };
}
function withdraw(amount) {
  return { type: actions.account_withdraw, payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: actions.account_requestLoan,
    payload: {
      amount: amount,
      purpose: purpose,
    },
  };
}
function payLoan() {
  return { type: actions.account_payloan };
}

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      //later
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateCustomer":
      return { ...state, fullName: action.payload.fullName };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

store.dispatch({ type: actions.account_deposit, payload: 500 });
store.dispatch({ type: actions.account_withdraw, payload: 200 });
console.log(store.getState());

store.dispatch({
  type: actions.account_requestLoan,
  payload: {
    amount: 1000,
    purpose: "buy a car",
  },
});

console.log(store.getState());

store.dispatch({ type: actions.account_payloan });

console.log(store.getState());
console.log("-----------------action functions-----------");

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(300));
console.log(store.getState());

store.dispatch(requestLoan(1000, "buy a car"));
console.log(store.getState());

store.dispatch(payLoan());

//_______________________

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(), // placed here and not in the accountReducer function because it has a side effect and accountReducer functions should not have side effects
    },
  };
}

function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}

console.log("----------------customer-----------");

store.dispatch(createCustomer("Jonas Antile", "340HJ77"));
console.log(store.getState());

store.dispatch(updateName("Jonas Dombosko"));
console.log(store.getState());

store.dispatch(deposit(500));
console.log(store.getState());
