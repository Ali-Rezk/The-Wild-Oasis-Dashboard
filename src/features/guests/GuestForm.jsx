import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useUpdateGuest } from "./UseGuests";
import SpinnerMini from "../../ui/SpinnerMini";

export default function GuestForm({ guest, onClose }) {
  const { register, handleSubmit } = useForm({
    defaultValues: guest,
  });
  const { mutate: updateGuest, isPending: isUpdating } = useUpdateGuest();
  function onSubmit(data) {
    updateGuest({ id: guest.id, updatedGuest: data }, { onSuccess: onClose });
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type="modal"
      className={"bg-grey-50 p-[2.4rem] rounded-[7px]"}
    >
      <FormRow label="Full name">
        <Input type="text" {...register("fullName")} />
      </FormRow>
      <FormRow label="Email">
        <Input type="email" {...register("email")} />
      </FormRow>
      <FormRow label="Nationality">
        <Input type="text" {...register("nationality")} />
      </FormRow>
      <FormRow label="National ID">
        <Input type="text" {...register("nationalID")} />
      </FormRow>
      <div className="flex items-center justify-end mt-6">
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : "Save"}
        </Button>
      </div>
    </Form>
  );
}
