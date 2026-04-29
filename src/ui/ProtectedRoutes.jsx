import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCurrentUser } from "../features/authentication/useAuth";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated, fetchStatus } = useCurrentUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
        navigate("/login");
    },
    [isAuthenticated, isLoading, fetchStatus, navigate],
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <div className="h-screen bg-grey-50 flex items-center justify-center">
        <Spinner />
      </div>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
