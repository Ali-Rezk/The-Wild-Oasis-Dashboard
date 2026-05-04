import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { Flag } from "../../ui/Flag";
import DataItem from "../../ui/DataItem";

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: {
      fullName: guestName,
      email,
      nationality,
      countryFlag,
      nationalID,
    },
    cabins: { name: cabinName },
  } = booking;

  console.log(extrasPrice);

  return (
    <section className="bg-grey-0 border border-grey-100 rounded-[7px] overflow-hidden">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-brand-500 text-[#e0e7ff] px-4 py-4 sm:px-16 sm:py-8 text-[1.6rem] sm:text-[1.8rem] font-medium [&_svg]:w-[3.2rem] [&_svg]:h-[3.2rem]">
        <div className="flex items-center gap-[1.6rem] font-semibold">
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin{" "}
            <span className="font-[Sono] text-[2rem] ml-[4px]">
              {cabinName}
            </span>
          </p>
        </div>

        <p className="text-[1.4rem] sm:text-[1.8rem]">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section className="px-4 pt-[3.2rem] pb-[1.2rem] sm:px-[4rem]">
        <div className="flex flex-wrap items-center gap-[1.2rem] mb-[1.6rem] text-grey-500 [&_p:first-of-type]:font-medium [&_p:first-of-type]:text-grey-700">
          {countryFlag && (
            <Flag src={countryFlag} alt={`Flag of ${nationality}`} />
          )}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-[1.6rem] sm:px-[3.2rem] rounded-[var(--border-radius-sm)] mt-[2.4rem] [&_p:last-child]:uppercase [&_p:last-child]:text-[1.4rem] [&_p:last-child]:font-semibold [&_svg]:w-[2.4rem] [&_svg]:h-[2.4rem] [&_svg]:text-current ${
            isPaid
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <DataItem icon={<HiOutlineCurrencyDollar />} label="Total price">
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </div>
      </section>

      <footer className="text-grey-500 text-right text-[1.2rem] px-4 py-[1.6rem] sm:px-[4rem]">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
