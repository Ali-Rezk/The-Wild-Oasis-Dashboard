import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import { useGetBookings } from "./bookingshooks";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { BOOKINGS_PER_PAGE } from "../../utils/constants";

function BookingTable() {
  const { data: { data: bookings, count } = {}, isLoading } = useGetBookings();

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resource="bookings" />;

  return (
    <Table columns="grid-cols-5">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
      <Table.Footer>
        <Pagination count={count} pageSize={BOOKINGS_PER_PAGE} />
      </Table.Footer>
    </Table>
  );
}

export default BookingTable;
