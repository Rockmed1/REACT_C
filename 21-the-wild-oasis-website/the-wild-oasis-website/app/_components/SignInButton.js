import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    <form action={signInAction}>
      {/* we cannot use onClick because this is a server component so we use server action instead in a form wrapper as this can run on the server */}
      <button className="border-primary-300 flex items-center gap-6 border px-10 py-4 text-lg font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
