import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin",
// };

//DYNAMIC METADATA:
export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const { name } = await getCabin(cabinId);

  return { title: `Cabin ${name}` };
}

//Static params: to generate static pages for all the possible pages
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}

export default async function Page({ params }) {
  //we need to fetch multiple pieces of data for a single page....
  //THIS CAN CREATE BLOCKING WATERFALL WAIT EFFECT: where the whole page is blocked untill ALL the fetching is complete
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(cabinId);

  // One solution is to run all promises in parallel so that they don't block each other: however this is still blocking by the speed of the slowest fetch
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(cabinId),
  // ]);

  //BETTER to create separate components and stream the to the parent component as they become ready... using suspense

  // for the "cabin" data we could also use request memozation feature and make a db call in each child component that needs it and it will only hit the db once and cache the results. this is a good solution if we had a deeper component tree, but here we are just getting it once and then passing it as props

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-accent-400 mb-10 text-center text-5xl font-semibold">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          {/* streaming reservation data as it becomes available */}
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
