import CabinCard from "@/app/_components/CabinCard";
import CabinList from "../_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

// export const dynamic = "force-dynamic";

//make the route dynamic and force validate the data (re-fetch)
// export const revalidate = 0; // value in seconds
export const revalidate = 3600; // value in seconds // it will be irrelevant if we use searchParams as searchParams will automatically make the page dynamic

//this will override the main metadata
export const metadata = {
  title: "Cabins",
};
// import CabinCard from "@/app/_components/CabinCard";

export default async function Page({ searchParams }) {
  const { capacity } = await searchParams;
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
        {/* the key here is to make the suspense unique so that we get the spinner everytime the cabinlist loads */}
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
