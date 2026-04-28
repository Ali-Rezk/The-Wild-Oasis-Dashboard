import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiEye } from "react-icons/hi";
import { Navigate, useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare } from "react-icons/hi2";

function BookingRow({ booking }) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();

  return (
    <Table.Row className={"[&_div]:text-center [&_span]:mx-auto"}>
      <div className="text-[1.6rem] font-semibold text-grey-600 font-['Sono']">
        {booking.cabins.name}
      </div>

      <div className="flex flex-col gap-[0.2rem] [&_span:first-child]:font-medium [&_span:last-child]:text-grey-500 [&_span:last-child]:text-[1.2rem]">
        <span>{booking.guests.fullName}</span>
        <span>{booking.guests.email}</span>
      </div>

      <div className="flex flex-col gap-[0.2rem] [&_span:first-child]:font-medium [&_span:last-child]:text-grey-500 [&_span:last-child]:text-[1.2rem]">
        <span>
          {isToday(new Date(booking.startDate))
            ? "Today"
            : formatDistanceFromNow(booking.startDate)}{" "}
          &rarr; {booking.numNights} night stay
        </span>
        <span>
          {format(new Date(booking.startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(booking.endDate), "MMM dd yyyy")}
        </span>
      </div>

      <Tag type={statusToTagName[booking.status?.toLowerCase()]}>
        {booking.status.replace("-", " ")}
      </Tag>

      <div className="font-['Sono'] font-medium">
        {formatCurrency(booking.totalPrice)}
      </div>
      <div className="flex gap-5 justify-center items-center">
        <button onClick={() => navigate(`/bookings/${booking.id}`)}>
          <HiEye className="text-[1.8rem] text-blue-500 cursor-pointer" />
        </button>
        {booking.status === "unconfirmed" && (
          <button onClick={() => navigate(`/checkin/${booking.id}`)}>
            <HiArrowDownOnSquare className="text-[1.8rem] text-green-500 cursor-pointer" />
          </button>
        )}
        {/* {booking.status === "unconfirmed" && (
          <button onClick={() => navigate(`/checkin/${booking.id}`)}>
            <HiArrowDownOnSquare className="text-[1.8rem] text-green-500 cursor-pointer" />
          </button>
        )} */}
      </div>
    </Table.Row>
  );
}

export default BookingRow;
