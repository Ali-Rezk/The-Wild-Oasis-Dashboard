import { useState } from "react";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { BOOKINGS_PER_PAGE } from "../../utils/constants";
import GuestRow from "./GuestRow";
import { useGuests } from "./UseGuests";
import Modal from "../../ui/Modal";
import GuestForm from "./GuestForm";

export default function GuestsTable() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const { data: guestsData, isLoading } = useGuests();

  const guests = guestsData?.data;
  const count = guestsData?.count;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Table
        columns={"grid-cols-4"}
        className="border border-grey-200 text-[1.4rem] bg-grey-0 rounded-[7px] w-full"
      >
        <Table.Header>
          <div className="">Guest</div>
          <div>Nationality</div>
          <div>National ID</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={guests}
          render={(guest) => (
            <GuestRow
              guest={guest}
              key={guest.id}
              onEdit={() => {
                setSelectedGuest(guest);
                setIsFormOpen(true);
              }}
            />
          )}
        ></Table.Body>
        <Table.Footer>
          <Pagination count={count} pageSize={BOOKINGS_PER_PAGE} />
        </Table.Footer>
      </Table>
      {isFormOpen && (
        <Modal title="Edit Guest" onClose={() => setIsFormOpen(false)}>
          <GuestForm
            guest={selectedGuest}
            onClose={() => setIsFormOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
