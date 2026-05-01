import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data: savedSessionData } = await supabase.auth.getSession();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar: "",
      },
    },
  });

  if (savedSessionData.session) {
    await supabase.auth.setSession(savedSessionData.session);
  }

  let authError = null;
  if (data.user && !data.user.identities.length) {
    authError = {
      name: "AuthApiError",
      message: "This email has already been registered",
    };
  } else if (error) {
    authError = {
      name: error.name,
      message: error.message,
    };
  }
  if (authError) throw new Error(authError.message);
  console.log(data);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  return true;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession();
  if (!data.session) return null;

  if (error) {
    throw new Error(error.message);
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  return userData?.user;
}

export async function updateUserData({ full_name, password, avatar }) {
  let uploadData = {};

  if (password) {
    uploadData = {
      password,
    };
  }
  if (full_name) {
    uploadData.data = {
      full_name,
    };
  }

  const { data, error } = await supabase.auth.updateUser(uploadData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Date.now()}-${avatar.name}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar, {
      cacheControl: "3600",
      upsert: false,
    });
  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: updatedData, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedData;
}
