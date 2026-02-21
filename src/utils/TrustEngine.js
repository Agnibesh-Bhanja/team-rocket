import { supabase } from "../lib/supabase";

// Increment login_count when user logs in
export async function updateLogin() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    // Create profile if it doesn't exist
    await supabase.from("profiles").insert([{ id: user.id, login_count: 1 }]);
    return 1; // initial trust
  } else {
    // Increment login_count
    await supabase
      .from("profiles")
      .update({ login_count: profile.login_count + 1 })
      .eq("id", user.id);

    return profile.login_count + 1; // for trustScore calculation
  }
}

// Increment reload_count
export async function incrementReload() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const newReload = (profile.reload_count || 0) + 1;

  await supabase
    .from("profiles")
    .update({ reload_count: newReload })
    .eq("id", user.id);

  const loginCount = profile.login_count || 0;
  const timeSpent = profile.time_spent || 0;

  return loginCount * 2 + newReload + Math.floor(timeSpent / 30);
}

// Track user time spent
export async function trackTime(seconds) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const newTime = (profile.time_spent || 0) + seconds;

  await supabase
    .from("profiles")
    .update({ time_spent: newTime })
    .eq("id", user.id);
}