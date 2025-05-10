"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  /* //since this is a server component, one option is to create server action like this:
  function deleteReservation() {
    "use server"; // always need use server directive in a server action function
    //code
  }
 */

  //useTransition:
  // 1- will give us an indication that something is happening in the background thus getting us access to isloading...
  // 2- will allow us to call a server action from a client button without needing a form
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    // this method allows us to keep all the actions together in one actions file
    if (confirm("Are you sure you want to delete the reservation?"))
      // startTransition(() => deleteReservation(bookingId));
      startTransition(() => onDelete(bookingId)); //onDelete: so it keep working after adding optimistic update feature
  }

  return (
    <button
      onClick={handleDelete}
      className="group text-primary-300 hover:bg-accent-600 hover:text-primary-900 flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase transition-colors"
    >
      {!isPending ? (
        <>
          <TrashIcon className="text-primary-600 group-hover:text-primary-800 h-5 w-5 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
