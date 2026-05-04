import AddGuest from "../features/guests/AddGuest";
import GuestsTable from "../features/guests/GuestsTable";
import GuestsTableOperations from "../features/guests/GuestsTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Guests() {
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">All guests</Heading>
        <GuestsTableOperations />
      </Row>
      <GuestsTable />
      <AddGuest />
    </Row>
  );
}
