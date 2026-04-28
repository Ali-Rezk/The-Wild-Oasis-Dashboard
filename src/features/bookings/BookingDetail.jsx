import { useNavigate } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking, useDeleteBooking } from "./bookingshooks";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";

function BookingDetails() {
  const { booking, isLoading } = useBooking();
  const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  // const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!booking) {
    return <div>Booking not found</div>;
  }

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

        {/* {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )} */}

        {/* <ConfirmDelete
          resource="booking"
          onConfirm={(options) => deleteBooking(bookingId, options)}
          disabled={isDeleting}
          closeModal={() => setDeleteModalOpen(false)}
        /> */}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetails;
