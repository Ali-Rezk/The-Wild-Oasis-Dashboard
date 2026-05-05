import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createGuest,
  deleteGuest,
  getGuests,
  updateGuest,
} from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { BOOKINGS_PER_PAGE } from "../../utils/constants";
import toast from "react-hot-toast";

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

export function useUpdateGuest() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, updatedGuest }) => updateGuest(id, updatedGuest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      toast.success("Guest updated successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Unable to update guest");
    },
  });

  return mutation;
}

export function useCreateGuest() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newGuest) => createGuest(newGuest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      toast.success("Guest created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Unable to create guest");
    },
  });

  return mutation;
}

export function useDeleteGuest() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => deleteGuest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      toast.success("Guest deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Unable to delete guest");
    },
  });

  return mutation;
}
