"use client";

// import SelectCountry from "@/app/_components/SelectCountry";
import { updateGuest } from "@/app/_lib/actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function UpdateProfileForm({ guest, children }) {
  const [count, setCount] = useState(); // NOT USED IN THIS COMPONENT - dummy example just to make the form a client component to demonstrate how we render a server component inside a client component.

  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  // we will use server action inside the form since this is a client component
  return (
    <div>
      <form
        action={updateGuest} // the only thing needed to pass the form data
        // each form field needs a name so that it shows in the form data
        className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            name="fullName" // needed so that it shows in the form data
            defaultValue={fullName}
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            name="email" // needed so that it shows in the form data
            defaultValue={email}
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>
        </div>
        {/* this is where we will place the server components; avoiding the error of importing a server component in a client component */}
        {children}

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalID" // needed so that it shows in the form data
            defaultValue={nationalID}
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <Button />
        </div>
      </form>
    </div>
  );
}

// we later encapsulate this into a reusable component SubmitButton
function Button() {
  const { pending, formData, method, action } = useFormStatus(); // this hook could only be used
  // 1- in a client component
  // 2- in a component that is rendered by a form, NOT directly in the form component
  return (
    <button
      className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-8 py-4 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "Updating..." : "Updade profile"}
    </button>
  );
}
export default UpdateProfileForm;
