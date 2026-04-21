import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

function CreateCabinForm() {
  return (
    <Form>
      <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-[2.4rem] py-[1.2rem] first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grey-100">
        <label htmlFor="name" className="font-medium">
          Cabin name
        </label>
        <Input type="text" id="name" />
      </div>

      <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-[2.4rem] py-[1.2rem] first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grey-100">
        <label htmlFor="maxCapacity" className="font-medium">
          Maximum capacity
        </label>
        <Input type="number" id="maxCapacity" />
      </div>

      <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-[2.4rem] py-[1.2rem] first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grey-100">
        <label htmlFor="regularPrice" className="font-medium">
          Regular price
        </label>
        <Input type="number" id="regularPrice" />
      </div>

      <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-[2.4rem] py-[1.2rem] first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grey-100">
        <label htmlFor="discount" className="font-medium">
          Discount
        </label>
        <Input type="number" id="discount" defaultValue={0} />
      </div>

      <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-[2.4rem] py-[1.2rem] first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grey-100">
        <label htmlFor="description" className="font-medium">
          Description for website
        </label>
        <Textarea type="number" id="description" defaultValue="" />
      </div>

      <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-[2.4rem] py-[1.2rem] first:pt-0 last:pb-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grey-100">
        <label htmlFor="image" className="font-medium">
          Cabin photo
        </label>
        <FileInput id="image" accept="image/*" />
      </div>

      <div className="flex justify-end gap-[1.2rem] py-[1.2rem] last:pb-0">
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
