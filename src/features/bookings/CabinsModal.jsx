import { useGetCabins } from "../cabins/cabinHooks";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

export default function CabinsModal({ onSelect, onClose }) {
  const { data: cabins, isLoading } = useGetCabins();

  if (isLoading) return <Spinner />;

  return (
    <div className="min-w-240">
      <Table columns="grid-cols-[6rem_2fr_1fr_1fr_auto]">
        <Table.Header>
          <div>Photo</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Select</div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => (
            <Table.Row key={cabin.id}>
              <div>
                <img
                  src={cabin.image}
                  alt={cabin.name}
                  className="w-20 aspect-3/2 object-cover rounded"
                />
              </div>
              <div className="font-semibold text-grey-700 font-['Sono']">
                {cabin.name}
              </div>
              <div className="text-grey-600">Up to {cabin.maxCapacity} guests</div>
              <div className="font-['Sono']">
                <span>{formatCurrency(cabin.regularPrice)}</span>
                {cabin.discount > 0 && (
                  <span className="text-green-700 text-[1.2rem] ml-1">
                    &minus;{formatCurrency(cabin.discount)}
                  </span>
                )}
              </div>
              <div>
                <Button
                  size="small"
                  type="button"
                  onClick={() => {
                    onSelect(cabin);
                    onClose();
                  }}
                >
                  Select
                </Button>
              </div>
            </Table.Row>
          )}
        />
      </Table>
    </div>
  );
}

