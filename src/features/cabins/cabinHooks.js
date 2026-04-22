import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEditCabin,
  deleteCabin,
  getCabins,
} from "../../services/apiCabin";
import toast from "react-hot-toast";

export function useGetCabins() {
  const cabinsData = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return cabinsData;
}

export function useCreateEditCabin(isEditMode) {
  const queryClient = useQueryClient();

  const createEditCabinMutation = useMutation({
    mutationFn: ({ id, ...data }) => createEditCabin(data, id),
    onSuccess: () => {
      toast.success(
        isEditMode
          ? "Cabin updated successfully"
          : "Cabin created successfully",
      );
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        isEditMode ? "Unable to update cabin" : "Unable to create cabin",
      );
    },
  });

  return createEditCabinMutation;
}

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const mutateDeleteCabin = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
      toast.success("Cabin deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Unable to delete cabin");
    },
  });

  return mutateDeleteCabin;
}
