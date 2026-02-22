import { supabase } from "../lib/supabase";

async function getOrCreateProfile(userId) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle(); // maybeSingle() doesn't throw an error if row is missing

  if (!profile) {
    const { data: newProfile } = await supabase
      .from("profiles")
      .insert([{ id: userId, login_count: 1, reload_count: 0, time_spent: 0 }])
      .select()
      .single();
    return newProfile;
  }
  return profile;
}

export async function incrementReload() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const profile = await getOrCreateProfile(user.id);
  const newReload = (profile.reload_count || 0) + 1;

  await supabase
    .from("profiles")
    .update({ reload_count: newReload })
    .eq("id", user.id);

  return (profile.login_count || 0) * 2 + newReload + Math.floor((profile.time_spent || 0) / 30);
}

export async function trackTime(seconds) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const profile = await getOrCreateProfile(user.id);
  const newTime = (profile.time_spent || 0) + seconds;

  await supabase
    .from("profiles")
    .update({ time_spent: newTime })
    .eq("id", user.id);
}