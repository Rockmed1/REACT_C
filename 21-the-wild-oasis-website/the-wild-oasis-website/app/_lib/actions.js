"use server";

//this is for server actions to be passed to the client
//all functions have to be async functions
// since we are on the server now we need to always make sure of 2 things:
// 1 - the user is authorized
// 2 - assume the input is unsafe

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  //validate the nationalID input
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  //manual revalidation to avoid stale data on the form
  revalidatePath("/account/profile");
}

export async function createBooking(bookingData, formData) {
  //1-Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // //2- Authorization
  // //validation to prevent deletion of records not owned by the user (inner join basically)
  // const guestBookings = await getBookings(session.user.guestId);
  // const guestBookingsIds = guestBookings.map((booking) => booking.id);
  // if (!guestBookingsIds.includes(bookingId))
  //   throw new Error("You are not allowed to create this booking");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.CabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  console.log(newBooking);

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId) {
  // // For testing
  // await new Promise((res) => setTimeout(res, 4000));

  //1-Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //2- Authorization
  //validation to prevent deletion of records not owned by the user (inner join basically)
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  //to clear the cache and update the page on the client side
  revalidatePath("account/reservations");
}

export async function updateReservation(formData) {
  //1-Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const updatedData = Object.fromEntries(formData.entries());
  const { bookingId, numGuests, observations: rawObservation } = updatedData;
  const observations = rawObservation.slice(0, 1000); // to protect against too long of input

  //2- Authorization
  //validation to prevent deletion of records not owned by the user (inner join basically)
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(+bookingId))
    throw new Error("You are not allowed to update this booking");

  //4- mutation
  const { error } = await supabase
    .from("bookings")
    .update({ numGuests, observations })
    .eq("id", bookingId);

  if (error) {
    throw new Error("Reservation could not be updated");
  }
  //to clear the cache and update the page on the client side
  revalidatePath("account/reservations");
  revalidatePath(`account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
