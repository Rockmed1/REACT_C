import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"], //uniquely identify the data fetched
    queryFn: getSettings, // fn that has to return a promise
  });

  return { isLoading, settings, error };
}
