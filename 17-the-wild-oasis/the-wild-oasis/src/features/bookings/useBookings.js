import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  //Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //Pagination
  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  //Query
  const {
    isLoading,
    data: { data: bookings, count } = {}, // in the begining the data will not be ready and therefore will not exist so it will throw an error trying to destructure so we give it the default value of {} in case data:bookings is undefined
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], //the second arg is to make react query to re-fetch the data when the filter value changes, just like the useEffect dependency array.
    queryFn: () => getBookings({ filter, sortBy, page }), // fn that has to return a promise
  });

  //Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }), // page: page + 1 syntax because it is in an object
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }), // page: page + 1 syntax because it is in an object
    });

  return { isLoading, error, bookings, count };
}
