import { useNavigate } from "react-router-dom";

import Spinner from "ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import Row from "ui/Row";
import Heading from "ui/Heading";
import Tag from "ui/Tag";
import ButtonGroup from "ui/ButtonGroup";
import Button from "ui/Button";
import Modal from "ui/Modal";
import ConfirmDelete from "ui/ConfirmDelete";
import ButtonText from "ui/ButtonText";
import Empty from "ui/Empty";

import { useBooking } from "features/bookings/useBooking";
import { useDeleteBooking } from "./useDeleteBooking";
import { useMoveBack } from "hooks/useMoveBack";
import { useCheckout } from "features/check-in-out/useCheckout";

function BookingDetail() {
  const { booking } = useBooking();
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <div className="flex gap-[2.4rem] items-center">
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </div>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Toggle opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Toggle>
          <Modal.Window name="delete">
            <ConfirmDelete
              resource="booking"
              onConfirm={(options) => deleteBooking(bookingId, options)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
