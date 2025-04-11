import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //we are using react-query here. we use useMutation because technically something changes on the server and to take advantage of the onSuccess and onError functions
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user); // this is to manually set the user data in the cash immediatly after it has been fetched from the server the first time to avoid refetching from the server every time after that
      navigate("/dashboard", { replace: true }); // to erase the back functionality
    },

    onError: (err) => {
      console.log("ERROR 🚨", err);
      toast.error("Provided email and/or password are invalid");
    },
  });

  return { login, isLoading };
}
