import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      {/* We could do these two as compound components as well, but let's keep it simple, and let's also explore different ways of achieving the same thing */}
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <Sort
        options={[
          {
            value: "created_at-desc",
            label: "Sort by Creation date (recent first)",
          },
          {
            value: "created_at-asc",
            label: "Sort by Creation date (earlier first)",
          },
          {
            value: "startDate-desc",
            label: "Sort by Start date (recent first)",
          },
          {
            value: "startDate-asc",
            label: "Sort by Start date (earlier first)",
          },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
