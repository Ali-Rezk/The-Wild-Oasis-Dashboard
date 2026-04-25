import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useGetCabins } from "./cabinHooks";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

export default function CabinTable() {
  const [showForm, setShowForm] = useState(false);
  const [cabin, setCabin] = useState(null);

  const { data: cabins, error, isLoading } = useGetCabins();

  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("discount") || "all";

  let filteredCabins = cabins;

  if (filteredValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => !cabin.discount);
  } else if (filteredValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount);
  }

  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <Table
        columns="grid-cols-6"
        className="border border-grey-200 text-[1.4rem] bg-grey-0 rounded-[7px] overflow-hidden w-full"
      >
        <Table.Header>
          <div className="col-span-2">Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => (
            <CabinRow
              cabin={cabin}
              key={cabin.id}
              setCabin={setCabin}
              onUpdate={setShowForm}
            />
          )}
        ></Table.Body>
      </Table>
      {showForm && (
        <Modal onClose={() => setShowForm(false)} title={"Edit Cabin"}>
          <CreateCabinForm
            cabin={cabin}
            onCloseModal={() => setShowForm(false)}
          />
        </Modal>
      )}
    </>
  );
}
