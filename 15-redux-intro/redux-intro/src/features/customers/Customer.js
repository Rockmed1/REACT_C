import { useSelector } from "react-redux";

function Customer() {
  //we should do as much data manipulation as possible in the selector function
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
