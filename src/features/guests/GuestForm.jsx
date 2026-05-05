import { useForm } from "react-hook-form";
import { countries } from "countries-list";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useUpdateGuest } from "./UseGuests";
import SpinnerMini from "../../ui/SpinnerMini";

const countryNames = Object.values(countries)
  .map((c) => c.name)
  .sort();

export default function GuestForm({ guest, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: guest });
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
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          id="fullName"
          type="text"
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors.nationality?.message}>
        <>
          <Input
            id="nationality"
            type="text"
            list="countries-list"
            {...register("nationality", {
              required: "Nationality is required",
              validate: (val) =>
                countryNames.includes(val) ||
                "Select a valid country from the list",
            })}
          />
          <datalist id="countries-list">
            {countryNames.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </>
      </FormRow>

      <FormRow label="National ID" error={errors.nationalID?.message}>
        <Input
          id="nationalID"
          type="text"
          {...register("nationalID", {
            required: "National ID is required",
            minLength: {
              value: 5,
              message: "National ID must be at least 5 characters",
            },
          })}
        />
      </FormRow>

      <div className="flex items-center justify-end mt-6">
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : "Save"}
        </Button>
      </div>
    </Form>
  );
}
