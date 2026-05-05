import {
  HiOutlineBanknotes,
  HiOutlineCurrencyDollar,
  HiOutlinePhoto,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import DataItem from "../../ui/DataItem";
import { formatCurrency } from "../../utils/helpers";

export default function CabinDetails({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, description, image } =
    cabin;

  return (
    <div className="w-[60rem] max-w-full">
      {/* Image */}
      <div className="mb-[2.4rem] overflow-hidden rounded-(--border-radius-md)">
        <img
          src={image}
          alt={`Cabin ${name}`}
          className="w-full h-[24rem] object-cover object-center"
        />
      </div>

      {/* Title */}
      <h3 className="text-[2rem] font-semibold text-grey-800 mb-[2rem] font-['Sono']">
        Cabin {name}
      </h3>

      {/* Data items */}
      <div className="border border-grey-100 rounded-(--border-radius-md) px-[2.4rem] divide-y divide-grey-100 mb-[2.4rem]">
        <DataItem icon={<HiOutlineUserGroup />} label="Max capacity">
          <span>{maxCapacity} guests</span>
        </DataItem>

        <DataItem icon={<HiOutlineBanknotes />} label="Regular price">
          <span className="font-['Sono'] font-semibold">
            {formatCurrency(regularPrice)}
          </span>
        </DataItem>

        <DataItem icon={<HiOutlineCurrencyDollar />} label="Discount">
          {discount ? (
            <span className="font-['Sono'] font-medium text-green-700">
              {formatCurrency(discount)}
            </span>
          ) : (
            <span>&mdash;</span>
          )}
        </DataItem>

        {description && (
          <DataItem icon={<HiOutlinePhoto />} label="Description">
            <p className="text-grey-600 leading-relaxed">{description}</p>
          </DataItem>
        )}
      </div>
    </div>
  );
}
