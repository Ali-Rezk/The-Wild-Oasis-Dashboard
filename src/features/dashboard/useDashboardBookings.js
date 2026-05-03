import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = parseInt(searchParams.get("last")) || 7;
  const querydate = subDays(new Date(), numDays).toISOString();

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(querydate),
  });

  return { bookings, isLoading, error };
}

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = parseInt(searchParams.get("last")) || 7;
  const querydate = subDays(new Date(), numDays).toISOString();

  const {
    data: stays,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(querydate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out",
  );

  return { stays: confirmedStays, isLoading, error, numDays };
}
