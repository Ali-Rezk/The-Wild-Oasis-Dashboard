import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { Flag } from "../../ui/Flag";
import Table from "../../ui/Table";

export default function GuestRow({ guest }) {
  const initials = guest.fullName
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Table.Row>
      {/* Guest */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center text-[1.2rem] font-semibold shrink-0">
          {initials}
        </div>
        <div className="flex flex-col gap-[0.2rem]">
          <span className="font-medium text-grey-800">{guest.fullName}</span>
          <span className="text-grey-500 text-[1.2rem]">{guest.email}</span>
        </div>
      </div>

      {/* Nationality */}
      <div className="flex items-center gap-3">
        {guest.countryFlag && (
          <Flag src={guest.countryFlag} alt={`Flag of ${guest.nationality}`} />
        )}
        <span className="text-grey-600">{guest.nationality ?? "—"}</span>
      </div>

      {/* National ID */}
      <div className="font-['Sono'] text-grey-600 flex justify-center">
        {guest.nationalID ?? "—"}
      </div>

      {/* Actions */}
      <div className="flex gap-4 items-center justify-center">
        <button
          className="p-[0.4rem] rounded-sm text-grey-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
          title="Edit guest"
        >
          <HiOutlinePencilSquare className="w-[1.8rem] h-[1.8rem]" />
        </button>
        <button
          className="p-[0.4rem] rounded-sm text-grey-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Delete guest"
        >
          <HiOutlineTrash className="w-[1.8rem] h-[1.8rem]" />
        </button>
      </div>
    </Table.Row>
  );
}
