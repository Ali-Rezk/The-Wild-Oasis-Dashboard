import { BOOKINGS_PER_PAGE } from "../utils/constants";
import { getIso2Code } from "../utils/helpers";
import supabase from "./supabase";

export async function getGuests({ page, search }) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  if (search) {
    query = query.or(
      `fullName.ilike.%${search}%,email.ilike.%${search}%,nationalID.ilike.%${search}%`,
    );
  }

  if (page) {
    const from = (page - 1) * BOOKINGS_PER_PAGE;
    const to = from + BOOKINGS_PER_PAGE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Unable to fetch guests");
  }
  return { data, count };
}

export async function updateGuest(id, updatedGuest) {
  const countryCode = getIso2Code(updatedGuest.nationality);
  updatedGuest = {
    ...updatedGuest,
    countryFlag: countryCode ? `https://flagcdn.com/${countryCode}.svg` : null,
  };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedGuest)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Unable to update guest");
  }
  return data;
}

export async function createGuest(newGuest) {
  const countryCode = getIso2Code(newGuest.nationality);
  newGuest = {
    ...newGuest,
    countryFlag: countryCode ? `https://flagcdn.com/${countryCode}.svg` : null,
  };

  const { data, error } = await supabase
    .from("guests")
    .insert(newGuest)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Unable to create guest");
  }
  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
