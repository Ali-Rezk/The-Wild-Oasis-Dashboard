import Button from "./Button";
import Heading from "./Heading";
import Modal from "./Modal";
import SpinnerMini from "./SpinnerMini";

function ConfirmDelete({ resource, onConfirm, disabled, closeModal }) {
  return (
    <Modal onClose={closeModal}>
      <div className="flex flex-col gap-[1.2rem] w-full max-w-[40rem]">
        <Heading as="h3">Delete {resource}</Heading>
        <p className="text-grey-500 mb-[1.2rem]">
          Are you sure you want to delete this {resource} permanently? This
          action cannot be undone.
        </p>

        <div className="flex justify-end gap-[1.2rem]">
          <Button variation="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variation="danger" onClick={onConfirm} disabled={disabled}>
            {disabled ? <SpinnerMini size="h-5 w-5" /> : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDelete;
