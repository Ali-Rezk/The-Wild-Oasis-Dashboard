import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestRow from "./GuestRow";
import { useGuests } from "./UseGuests";

export default function GuestsTable() {
  const { data: guests, isLoading } = useGuests();

  if (isLoading) return <Spinner />;

  return (
    <Table
      columns={"grid-cols-4"}
      className="border border-grey-200 text-[1.4rem] bg-grey-0 rounded-[7px] w-full"
    >
      <Table.Header>
        <div className="">
          Guest
          {/* <div>Id</div>
          <div>FullName</div>
        <div>Email</div> */}
        </div>
        <div>Nationality</div>
        <div>NationalID</div>
        <div>Actions</div>
      </Table.Header>
      <Table.Body
        data={guests}
        render={(guest) => (
          <GuestRow
            guest={guest}
            key={guest.id}
            // setGuest={setGuest}
            // onUpdate={setShowForm}
          />
        )}
      ></Table.Body>
    </Table>
  );
}
