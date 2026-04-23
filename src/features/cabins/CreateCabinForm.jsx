import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRow from "../../ui/FormRow";
import { useCreateUpdateCabin } from "./cabinHooks";

const defaultValues = {
  name: "",
  maxCapacity: "",
  regularPrice: "",
  discount: 0,
  description: "",
  image: null,
};

function CreateCabinForm({ onCloseModal, cabin }) {
  const isEditMode = Boolean(cabin);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: isEditMode ? cabin : defaultValues,
  });

  const { mutate, isPending } = useCreateUpdateCabin(isEditMode);

  function onSubmit(data) {
    const isImageString = typeof data.image === "string";
    mutate(
      {
        ...data,
        image: isImageString ? data.image : data.image[0],
        id: isEditMode ? cabin.id : undefined,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal();
        },
      },
    );
  }

  function onError(errors) {
    console.error(errors);
  }

  function validateDiscount(value) {
    const regularPrice = getValues("regularPrice");
    if (value === undefined || value === "") return true;
    if (isNaN(value)) return "Discount must be a number";
    if (Number(value) < 0) return "Discount cannot be negative";
    if (Number(value) >= Number(regularPrice))
      return "Discount must be less than regular price";
    return true;
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="bg-grey-50 p-[2.4rem] rounded-[7px]"
      type="modal"
    >
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Cabin name is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          onWheel={(e) => e.target.blur()}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          onWheel={(e) => e.target.blur()}
          {...register("regularPrice", {
            required: "Regular price is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          onWheel={(e) => e.target.blur()}
          {...register("discount", { validate: validateDiscount })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          props={{
            id: "image",
            accept: "image/*",
            ...register(
              "image",
              //  { required: "Cabin photo is required" }
            ),
          }}
        />
      </FormRow>

      <div className="flex justify-end gap-[1.2rem] py-[1.2rem] last:pb-0">
        <Button
          variation="secondary"
          type="button"
          onClick={() => (
            reset(isEditMode ? cabin : defaultValues),
            onCloseModal()
          )}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <SpinnerMini />
          ) : isEditMode ? (
            "Update cabin"
          ) : (
            "Add cabin"
          )}
        </Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
