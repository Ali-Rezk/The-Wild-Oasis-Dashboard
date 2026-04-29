import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: "login",
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Login failed: ${error.message}`);
    },
  });
  return mutation;
}

export function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
