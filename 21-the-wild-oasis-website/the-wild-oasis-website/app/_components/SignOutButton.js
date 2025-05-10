import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      {" "}
      {/* this button is part of a client component so it will be a client component. so we could've used onClick={} here. we just did the form action={} instead and called the server action signOutAction from the client component */}
      <button className="hover:bg-primary-900 hover:text-primary-100 text-primary-200 flex w-full items-center gap-4 px-5 py-3 font-semibold transition-colors">
        {/* <ArrowRightOnRectangleIcon className="text-primary-600 h-5 w-5" /> */}
        <ArrowRightStartOnRectangleIcon className="text-primary-600 h-5 w-5" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
