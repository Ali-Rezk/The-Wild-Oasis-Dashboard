import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import SpinnerMini from "../../ui/SpinnerMini";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateUpdateCabin, useDeleteCabin } from "./cabinHooks";
import Button from "../../ui/Button";
import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

function CabinRow({ cabin, onUpdate, setCabin }) {
  const { mutate: deleteCabin, isPending: isDeletePending } = useDeleteCabin();
  const { mutate, isPending: isCreatePending } = useCreateUpdateCabin();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  function handleCreateCopy() {
    mutate({
      ...cabin,
      name: `${cabin.name} copy`,
      id: undefined,
    });
  }

  function handleDelete() {
    deleteCabin(cabin.id);
  }

  return (
    <Table.Row className="grid grid-cols-6 gap-x-10 items-center text-center px-[2.4rem] py-[1.4rem] not-last:border-b not-last:border-grey-100">
      <div>
        <img
          src={cabin.image}
          className="block w-[6.4rem] aspect-3/2 object-cover object-center scale-150 -translate-x-1.75"
        />
      </div>
      <div className="text-[1.6rem] text-left font-semibold text-grey-600 font-['Sono']">
        {cabin.name}
      </div>
      <div>Fits up to {cabin.maxCapacity} guests</div>
      <div className="font-['Sono'] font-semibold">
        {formatCurrency(cabin.regularPrice)}
      </div>
      <div>
        {cabin.discount ? (
          <span className="font-['Sono'] font-medium text-green-700">
            {formatCurrency(cabin.discount)}
          </span>
        ) : (
          <span>&mdash;</span>
        )}
      </div>
      <div>
        <button
          className="p-2 rounded text-purple-600 hover:bg-purple-50"
          onClick={handleCreateCopy}
          disabled={isCreatePending}
        >
          {isCreatePending ? (
            <SpinnerMini size="h-5 w-5" />
          ) : (
            <HiSquare2Stack className="w-5 h-5" />
          )}
        </button>
        <button
          className="p-2 rounded text-blue-600 hover:bg-blue-50"
          onClick={() => {
            setCabin(cabin);
            onUpdate(true);
          }}
          disabled={isCreatePending}
        >
          {<HiPencil className="w-5 h-5" />}
        </button>
        <button
          className="p-2 rounded text-red-600 hover:bg-red-50"
          onClick={() => setDeleteModalOpen(true)}
          disabled={isDeletePending}
        >
          {isDeletePending ? (
            <SpinnerMini size="h-5 w-5" />
          ) : (
            <HiTrash className="w-5 h-5" />
          )}
        </button>
        {deleteModalOpen && (
          <Modal onClose={() => setDeleteModalOpen(false)}>
            <ConfirmDelete
              resource={cabin.name}
              onConfirm={handleDelete}
              disabled={isDeletePending}
              closeModal={() => setDeleteModalOpen(false)}
            />
          </Modal>
        )}
      </div>
    </Table.Row>
  );
}

export default CabinRow;
