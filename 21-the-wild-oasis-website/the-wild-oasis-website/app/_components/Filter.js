"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// TO SHARE STATE FROM THE CLIENT TO THE SERVER WE USE THE URL

function Filter() {
  //this is the recipe to put searchParams in the url to pass state from client to server page component

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all"; // to pass that to the button to highlight the active button

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    // const params = new URLSearchParams(); // in this case this could work as well because we are setting it later
    // this will set the searchParams internally only
    params.set("capacity", filter);
    // this will replace the url in the address bar
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // don't scroll back to the top of the page
  }

  return (
    <div className="border-primary-800 flex border">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`hover:bg-primary-700 px-5 py-2 ${filter === activeFilter ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
