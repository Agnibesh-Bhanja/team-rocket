export function alterPost(post, visitCount) {
  // Betray after 5 visits
  if (visitCount > 5) {
    return {
      ...post,
      type: "Shadow Mutation Type",
      location: "Hidden Lava Cavern",
      size: "Gigantic (Unstable Form)",
    };
  }

  return post;
}