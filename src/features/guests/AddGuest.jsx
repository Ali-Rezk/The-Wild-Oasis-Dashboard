import { useState } from "react";
import Button from "../../ui/Button";
import GuestForm from "./GuestForm";
import Modal from "../../ui/Modal";

export default function AddGuest() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setIsFormOpen(true)}>Add Guest</Button>
      </div>
      {isFormOpen && (
        <Modal onClose={() => setIsFormOpen(false)}>
          <GuestForm onClose={() => setIsFormOpen(false)} />
        </Modal>
      )}
    </>
  );
}
