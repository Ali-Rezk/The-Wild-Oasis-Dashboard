import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import SpinnerMini from "../../ui/SpinnerMini";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./cabinHooks";

function CabinRow({ cabin, onUpdate, setCabin }) {
  const { mutate: deleteCabin, isPending } = useDeleteCabin();

  return (
    <>
      <tr className="grid grid-cols-6 gap-x-10 items-center text-center px-[2.4rem] py-[1.4rem] not-last:border-b not-last:border-grey-100">
        <td>
          <img
            src={cabin.image}
            className="block w-[6.4rem] aspect-3/2 object-cover object-center scale-150 -translate-x-1.75"
          />
        </td>
        <td className="text-[1.6rem] text-left font-semibold text-grey-600 font-['Sono']">
          {cabin.name}
        </td>
        <td>Fits up to {cabin.maxCapacity} guests</td>
        <td className="font-['Sono'] font-semibold">
          {formatCurrency(cabin.regularPrice)}
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
            className="p-2 rounded text-blue-600 hover:bg-blue-50"
            onClick={() => {
              setCabin(cabin);
              onUpdate(true);
            }}
            disabled={isPending}
          >
            {<HiPencil className="w-5 h-5" />}
          </button>
          <button
            className="p-2 rounded text-red-600 hover:bg-red-50"
            onClick={() => deleteCabin(cabin.id)}
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
