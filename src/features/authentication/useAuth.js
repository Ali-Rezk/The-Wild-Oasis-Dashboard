import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  login,
  logout,
  signup,
  updateUserData,
} from "../../services/apiAuth";

export function useSignup() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: "signup",
    mutationFn: ({ fullName, email, password }) =>
      signup({ fullName, email, password }),
    onSuccess: (data) => {
      toast.success(
        "Signed up successfully! Please check your email to confirm your account.",
      );
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Signup failed: ${error.message}`);
    },
  });
  return mutation;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: "login",
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      toast.success("Logged in successfully!");
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Login failed: ${error.message}`);
    },
  });
  return mutation;
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationKey: "logout",
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully!");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Logout failed: ${error.message}`);
    },
  });
  return logoutMutation;
}

export function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ full_name, password, avatar }) =>
      updateUserData({ full_name, password, avatar }),
    onSuccess: () => {
      toast.success("User data updated successfully!");
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(`Update failed: ${error.message}`);
    },
  });
  return mutation;
}
