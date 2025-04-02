import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    // mutationFn: (newCabin) => createEditCabin(newCabin),
    // mutiatin function can accept only one parameter so we pass an object and restructure it as follows:
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully Updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, isUpdating };
}
