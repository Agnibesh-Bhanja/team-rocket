export async function incrementVisit(supabase, userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("visit_count")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    return 0;
  }

  const newCount = (data?.visit_count || 0) + 1;

  await supabase
    .from("profiles")
    .update({ visit_count: newCount })
    .eq("id", userId);

  return newCount;
}