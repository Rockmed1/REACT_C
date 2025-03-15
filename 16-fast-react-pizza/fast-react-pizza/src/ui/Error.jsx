import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1 className="text-lg font-semibold uppercase tracking-wide text-stone-800">
        Something went wrong 😢
      </h1>

      {/* <p>{error.error?.message || error?.message}</p> */}
      <p>{error?.data || error?.message}</p>

      <LinkButton to={-1}>&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
