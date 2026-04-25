import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import { useGetBookings } from "./bookingshooks";
import Spinner from "../../ui/Spinner";

function BookingTable() {
  const { data: bookings = [], isLoading } = useGetBookings();

  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resource="bookings" />;

  return (
    <Table columns="grid-cols-6">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
    </Table>
  );
}

export default BookingTable;
