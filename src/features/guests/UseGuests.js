import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGuests() {
  const guests = useQuery({
    queryKey: ["guests"],
    queryFn: () => getGuests(),
  });
  if (guests.error) {
    console.error(guests.error);
    throw new Error("Unable to fetch guests");
  }
  return guests;
}
