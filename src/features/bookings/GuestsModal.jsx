import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Flag } from "../../ui/Flag";

const PAGE_SIZE = 10;

export default function GuestsModal({ onSelect, onClose }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: guestsData, isLoading } = useQuery({
    queryKey: ["guests-modal", page, search],
    queryFn: () => getGuests({ page, search }),
  });

  const guests = guestsData?.data || [];
  const count = guestsData?.count || 0;
  const totalPages = Math.ceil(count / PAGE_SIZE);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <div className="min-w-full overflow-auto">
      <div className="mb-4 w-full">
        <Input
          type="text"
          placeholder="Search by name, email or national ID..."
          value={search}
          onChange={handleSearchChange}
          className="w-1/2"
        />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <Table columns="grid-cols-[1fr_1fr_1fr_.5fr]" className="w-full">
          <Table.Header>
            <div>Guest</div>
            <div>Nationality</div>
            <div>National ID</div>
            <div>Select</div>
          </Table.Header>
          <Table.Body
            data={guests}
            render={(guest) => (
              <Table.Row key={guest.id}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-[1.2rem] font-semibold shrink-0">
                    {guest.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="flex flex-col gap-[0.2rem]">
                    <span className="font-medium text-grey-800">
                      {guest.fullName}
                    </span>
                    <span className="text-grey-500 text-[1.2rem]">
                      {guest.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {guest.countryFlag && (
                    <Flag
                      src={guest.countryFlag}
                      alt={`Flag of ${guest.nationality}`}
                    />
                  )}
                  <span className="text-grey-600">
                    {guest.nationality ?? "—"}
                  </span>
                </div>
                <div className="font-['Sono'] text-grey-600 text-center">
                  {guest.nationalID ?? "—"}
                </div>
                <div>
                  <Button
                    size="small"
                    type="button"
                    onClick={() => {
                      onSelect(guest);
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
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <Button
            size="small"
            variation="secondary"
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            &larr; Prev
          </Button>
          <span className="text-[1.4rem] text-grey-600">
            Page {page} of {totalPages}
          </span>
          <Button
            size="small"
            variation="secondary"
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
          >
            Next &rarr;
          </Button>
        </div>
      )}
    </div>
  );
}
