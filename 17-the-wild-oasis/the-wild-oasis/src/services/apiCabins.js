import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //mattovsplehupgolzfnn.supabase.co/storage/v1/object/public/cabin-images/0.929428974646791-cabin-004.jpg

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1-Create/Edit the cabin
  let query = supabase.from("cabins");

  //A-Create:
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B-Edit:
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single(); //to get a single row back

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2- if Successful upload the image
  // if the image already exists then do nothing with the image
  console.log(newCabin);
  console.log(hasImagePath);
  if (hasImagePath) {
    console.log(imagePath);
    return data;
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    //delete the cabin if there is an error uploading the image
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be upladed and cabin was not be created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
