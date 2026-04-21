import supabase, { supabaseUrl } from "./supabase";

const query = supabase.from("cabins");

export async function getCabins() {
  const { data, error } = await query.select("*");
  if (error) {
    console.error(error);
    throw new Error("Unable to fetch cabins");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await query.delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete cabin");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
}

("https://flhvpcybiprsfeiomssg.supabase.co/storage/v1/object/public/cabins/0.800205371197448-cabin-007.jpg");
("https://flhvpcybiprsfeiomssg.supabase.co/storage/v1/object/public/cabins/0.8310248666453899-cabin-008.jpg");
