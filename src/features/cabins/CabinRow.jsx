import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabin";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";

function CabinRow({ cabin }) {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => deleteCabin(cabin.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["cabins"]);
      toast.success("Cabin deleted successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Unable to delete cabin");
    },
  });

  return (
    <>
      <tr className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-x-[2.4rem] items-center px-[2.4rem] py-[1.4rem] not-last:border-b not-last:border-grey-100">
        <td>
          <img
            src={cabin.image}
            className="block w-[6.4rem] aspect-3/2 object-cover object-center scale-150 -translate-x-1.75"
          />
        </td>
        <td className="text-[1.6rem] font-semibold text-grey-600 font-['Sono']">
          {cabin.name}
        </td>
        <td>Fits up to {cabin.maxCapacity} guests</td>
        <td className="font-['Sono'] font-semibold">
          {formatCurrency(cabin.price)}
        </td>
        <td>
          {cabin.discount ? (
            <span className="font-['Sono'] font-medium text-green-700">
              {formatCurrency(cabin.discount)}
            </span>
          ) : (
            <span>&mdash;</span>
          )}
        </td>
        <td>
          <button
            className="p-2 rounded text-red-600 hover:bg-red-50"
            onClick={() => mutate(cabin.id)}
            disabled={isPending}
          >
            {isPending ? (
              <SpinnerMini size="h-5 w-5" />
            ) : (
              <HiTrash className="w-5 h-5" />
            )}
          </button>
        </td>
      </tr>
    </>
  );
}

export default CabinRow;
