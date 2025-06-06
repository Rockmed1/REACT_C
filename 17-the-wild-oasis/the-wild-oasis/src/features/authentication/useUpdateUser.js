import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // mutiatin function can accept only one parameter
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
