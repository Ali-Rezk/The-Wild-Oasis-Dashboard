import { HiPencil, HiTrash, HiSquare2Stack } from "react-icons/hi2";

import Menus from "ui/Menus";
import Modal from "ui/Modal";
import ConfirmDelete from "ui/ConfirmDelete";
import Table from "ui/Table";

import { formatCurrency } from "utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import CreateCabinForm from "./CreateCabinForm";

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const { mutate: deleteCabin, isLoading: isDeleting } = useDeleteCabin();
  const { mutate: createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `${name} duplicate`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row role="row">
      <img
        src={image}
        alt={`Cabin ${name}`}
        className="block aspect-[3/2] object-cover object-center"
        style={{ width: "6.4rem", transform: "scale(1.5) translateX(-7px)" }}
      />

      <div className="text-[1.6rem] font-semibold text-grey-600 font-[Sono]">
        {name}
      </div>

      <div>Fits up to {maxCapacity} guests</div>

      <div className="font-[Sono] font-semibold">{formatCurrency(regularPrice)}</div>

      {discount ? (
        <div className="font-[Sono] font-medium text-green-700">{formatCurrency(discount)}</div>
      ) : (
        <span>&mdash;</span>
      )}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />

          <Menus.List id={cabinId}>
            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
              Duplicate
            </Menus.Button>

            <Modal.Toggle opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit cabin</Menus.Button>
            </Modal.Toggle>

            <Modal.Toggle opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete cabin</Menus.Button>
            </Modal.Toggle>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resource="cabin"
            onConfirm={() => deleteCabin(cabinId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
