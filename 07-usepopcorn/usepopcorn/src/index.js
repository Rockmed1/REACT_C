import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import StarRating from "./StarRating";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
//       <p>this was rated {movieRating} stars</p>
//     </div>
//   );

// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating /> */}
    {/* <StarRating
  //   size={48}
  //   color="red"
  //   className="test"
  //   messages={["bad", "OK", "Good", "Great", "Amazing"]}
  //   defaultRating={3}
  // /> */}
    {/* <Test /> */}
  </React.StrictMode>
);
