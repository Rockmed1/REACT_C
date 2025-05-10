import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

/* moving the data fetching to its own component :
- as we should keep the data fetching as close as possible to where we need the data 
- and also to be able to use suspense */

async function CabinList({ filter }) {
  // option: TO OPT OUT FROM CASHING (make the page dynamic) on the Component level
  // noStore();
  // this will be usefull when partial pre-render is available in Next.js. this will make the parent page static with only this component as dynamic.

  const cabins = await getCabins();

  if (!cabins.length) return null;

  // this filtering should happen in the db server when we make the db call NOT here. we should recieve the data already filtered
  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
