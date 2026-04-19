import { useNavigate } from "react-router-dom";
import {
  HiPencil,
  HiTrash,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
} from "react-icons/hi2";

import Tag from "ui/Tag";
import Menus from "ui/Menus";
import Modal from "ui/Modal";
import ConfirmDelete from "ui/ConfirmDelete";
import Table from "ui/Table";

import { useDeleteBooking } from "features/bookings/useDeleteBooking";
import { formatCurrency, formatDistanceFromNow } from "utils/helpers";
import { useCheckout } from "features/check-in-out/useCheckout";
import { format, isToday } from "date-fns";

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row role="row">
      <div className="text-[1.6rem] font-semibold text-grey-600 font-[Sono]">
        {cabinName}
      </div>

      <div className="flex flex-col gap-[0.2rem]">
        <span className="font-medium">{guestName}</span>
        <span className="text-grey-500 text-[1.2rem]">{email}</span>
      </div>

      <div className="flex flex-col gap-[0.2rem]">
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span className="text-grey-500 text-[1.2rem]">
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </div>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <div className="font-[Sono] font-medium">{formatCurrency(totalPrice)}</div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
                icon={<HiArrowUpOnSquare />}
              >
                Check out
              </Menus.Button>
            )}

            <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>

            <Modal.Toggle opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Toggle>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resource="booking"
            onConfirm={(options) => deleteBooking(bookingId, options)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
