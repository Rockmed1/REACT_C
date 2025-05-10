import CabinList from "@/app/_components/CabinList";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";
// import CabinCard from "@/app/_components/CabinCard";

//DYNAMIC RENDERING:
// export const dynamic = "force-dynamic";
//make the route dynamic and force validate the data (re-fetch)
// export const revalidate = 0; // value in seconds

//INCREMENTAL STATIC REGENERATION (ISR)
export const revalidate = 3600; // value in seconds so it will be revalidated once an hour //
// this will be irrelevant if/when we use searchParams as searchParams will automatically make the page dynamic
//searchParams is used here to share state from the client to the server (pages only)

//this will override the main metadata
export const metadata = {
  title: "Cabins",
};

export default async function Page({ searchParams }) {
  //searchParams is used here to share state from the client to the server (pages only)
  const { capacity } = await searchParams; //this will make the route dynamic
  const filter = capacity ?? "all";

  return (
    <div>
      <h1 className="text-accent-400 mb-5 text-4xl font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 mb-10 text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="mb-8 flex justify-end">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        {/* "key={filter}" here is to make the suspense unique so that we get the spinner everytime the cabinlist loads : 
        without it there will be no feedback while the data is being fetched in the background until it's ready, we will just see stale data then updated data.
        explaination: fallback will not be shown again if the Suspense is wrapped in a transition. since Next.js wraps page navigations in transitions so we can reset the Suspense boundry with a unique key prop */}
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
