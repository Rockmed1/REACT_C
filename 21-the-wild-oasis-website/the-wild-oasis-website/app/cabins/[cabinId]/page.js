import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
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

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = await params;
  //THIS CAN CREATE WATERFALL WAIT EFFECT: where the whole page is blocked untill all the fetching is complete
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

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-accent-400 mb-10 text-center text-5xl font-semibold">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
