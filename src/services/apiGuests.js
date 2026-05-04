import supabase, { supabaseUrl } from "./supabase";

export async function getGuests() {
  const { data, error } = await supabase.from("guests").select("*");
  if (error) {
    console.error(error);
    throw new Error("Unable to fetch guests");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete cabin");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageString = typeof newCabin.image === "string";
  const imageName = !imageString
    ? `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
    : null;
  const imagePath = imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`
    : newCabin.image;

  let query;

  // A) CREATE
  if (!id)
    query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id && imageString)
    query = supabase.from("cabins").update(newCabin).eq("id", id);
  else if (id && !imageString)
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // Upload image only when a new file was provided
  if (!imageString) {
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, newCabin.image);

    // Delete the cabin IF there was an error uploading image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created",
      );
    }
  }

  return data;
}
