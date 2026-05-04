import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { BOOKINGS_PER_PAGE } from "../../utils/constants";

export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const paginationPage = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";

  const guests = useQuery({
    queryKey: ["guests", paginationPage, search],
    queryFn: () => getGuests({ page: paginationPage, search }),
  });
  if (guests.error) {
    console.error(guests.error);
    throw new Error("Unable to fetch guests");
  }

  if (guests.data?.count > paginationPage * BOOKINGS_PER_PAGE) {
    const nextPage = paginationPage + 1;
    queryClient.prefetchQuery({
      queryKey: ["guests", nextPage, search],
      queryFn: () => getGuests({ page: nextPage, search }),
    });
  }

  return guests;
}
