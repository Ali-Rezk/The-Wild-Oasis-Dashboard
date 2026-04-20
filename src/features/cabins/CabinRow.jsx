import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function CabinRow({ cabin }) {
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
        <td className="font-['Sono'] font-semibold"></td>
        <td>
          {cabin.discount ? (
            <span className="font-['Sono'] font-medium text-green-700">
              {formatCurrency(cabin.discount)}
            </span>
          ) : (
            <span>&mdash;</span>
          )}
        </td>
      </tr>
    </>
  );
}

export default CabinRow;
