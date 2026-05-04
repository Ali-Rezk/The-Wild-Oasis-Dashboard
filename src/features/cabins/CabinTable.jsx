import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useGetCabins } from "./cabinHooks";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

export default function CabinTable() {
  const [showForm, setShowForm] = useState(false);
  const [cabin, setCabin] = useState(null);

  const { data: cabins, isLoading } = useGetCabins();

  const [searchParams] = useSearchParams();
  const filteredValue = searchParams.get("discount") || "all";

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  let filteredCabins = cabins;

  if (filteredValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => !cabin.discount);
  } else if (filteredValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount);
  }

  let sortBy = searchParams.get("sortBy") || "CreatedAt-desc";

  const [sortField, sortDirection] = sortBy.split("-");

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (sortDirection === "asc") {
      if (a[sortField] < b[sortField]) return -1;
      if (a[sortField] > b[sortField]) return 1;
      return 0;
    } else {
      if (a[sortField] > b[sortField]) return -1;
      if (a[sortField] < b[sortField]) return 1;
      return 0;
    }
  });

  return (
    <>
      <Table
        columns="grid-cols-6"
        className="border border-grey-200 text-[1.4rem] bg-grey-0 rounded-[7px] w-full"
      >
        <Table.Header>
          <div className="col-span-2">Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
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
