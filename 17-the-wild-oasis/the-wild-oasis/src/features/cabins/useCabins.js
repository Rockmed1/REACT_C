import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"], //uniquely identify the data fetched
    queryFn: getCabins, // fn that has to return a promise
  });

  return { isLoading, cabins, error };
}
