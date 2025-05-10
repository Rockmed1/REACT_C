import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

// //DYNAMIC METADATA:
// export async function generateMetadata({ params }) {
//   const { bookingId } = await params;
//   const { booking } = await getBooking(bookingId);

//   return { title: `Booking ${bookingId}` };
// }

export default async function Page({ params }) {
  // CHANGE
  const { bookingId } = await params;
  const { cabinId, numGuests, observations } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);
  // const bookingId = 23;
  // const maxCapacity = 23;

  return (
    <div>
      <h2 className="text-accent-400 mb-7 text-2xl font-semibold">
        Edit Reservation #{bookingId}
      </h2>
      {/* <UpdateReservationForm booking={booking} maxCapacity={maxCapacity} /> */}
      <form
        action={updateReservation}
        className="bg-primary-900 flex flex-col gap-6 px-12 py-8 text-lg"
      >
        <input
          type="hidden"
          readOnly
          // hidden
          name="bookingId"
          value={bookingId}
        ></input>

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            required
            defaultValue={numGuests}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
            defaultValue={observations}
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <SubmitButton pendingLabel="Updating...">
            {/* only the button need to be a client component because of the useFormStatus() hook */}
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
