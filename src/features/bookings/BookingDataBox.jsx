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
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  console.log(extrasPrice);

  return (
    <section className="bg-grey-0 border border-grey-100 rounded-[7px] overflow-hidden">
      <header
        className="flex items-center justify-between text-[#e0e7ff] [&_svg]:w-[3.2rem] [&_svg]:h-[3.2rem]"
        style={{
          backgroundColor: "var(--color-brand-500)",
          padding: "2rem 4rem",
          fontSize: "1.8rem",
          fontWeight: 500,
        }}
      >
        <div className="flex items-center gap-[1.6rem] font-semibold text-[1.8rem]">
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin{" "}
            <span className="font-[Sono] text-[2rem] ml-[4px]">
              {cabinName}
            </span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section style={{ padding: "3.2rem 4rem 1.2rem" }}>
        <div
          className="flex items-center gap-[1.2rem] text-grey-500 [&_p:first-of-type]:font-medium [&_p:first-of-type]:text-grey-700"
          style={{ marginBottom: "1.6rem" }}
        >
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
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
          className="flex items-center justify-between [&_p:last-child]:uppercase [&_p:last-child]:text-[1.4rem] [&_p:last-child]:font-semibold [&_svg]:w-[2.4rem] [&_svg]:h-[2.4rem] [&_svg]:text-current"
          style={{
            padding: "1.6rem 3.2rem",
            borderRadius: "var(--border-radius-sm)",
            marginTop: "2.4rem",
            backgroundColor: isPaid
              ? "var(--color-green-100)"
              : "var(--color-yellow-100)",
            color: isPaid
              ? "var(--color-green-700)"
              : "var(--color-yellow-700)",
          }}
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

      <footer
        className="text-grey-500 text-right"
        style={{ padding: "1.6rem 4rem", fontSize: "1.2rem" }}
      >
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
