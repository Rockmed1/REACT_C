"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ pendingLabel, children }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-8 py-4 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {!pending ? children : pendingLabel}
    </button>
  );
}

export default SubmitButton;
