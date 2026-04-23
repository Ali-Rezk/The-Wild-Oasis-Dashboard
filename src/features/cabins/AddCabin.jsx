import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsModalOpen(!isModalOpen)}>
        Add new cabin
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Add new cabin">
          <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
