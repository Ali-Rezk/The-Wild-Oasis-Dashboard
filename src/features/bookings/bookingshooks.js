import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import {
  deleteBooking,
  getBooking,
  getBookings,
} from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";
import { BOOKINGS_PER_PAGE } from "../../utils/constants";

export function useGetBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status") || "all";
  const filter =
    filterValue === "all" ? null : { field: "status", value: filterValue };
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [sortField, sortOrder] = sortByRaw.split("-");
  const sortBy = { field: sortField, order: sortOrder };

  const paginationPage = Number(searchParams.get("page")) || 1;

  const bookingsData = useQuery({
    queryKey: ["bookings", filterValue, sortBy, paginationPage],
    queryFn: () => getBookings({ filter, sortBy, page: paginationPage }),
  });

  // prefetch next page

  if (bookingsData.data?.count > paginationPage * BOOKINGS_PER_PAGE) {
    const nextPage = paginationPage + 1;
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, nextPage],
      queryFn: () => getBookings({ filter, sortBy, page: nextPage }),
    });
  }

  return bookingsData;
}

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, error, booking };
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const mutateDeleteBooking = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries(["bookings"]);
      toast.success("booking deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Unable to delete booking");
    },
  });

  return mutateDeleteBooking;
}
