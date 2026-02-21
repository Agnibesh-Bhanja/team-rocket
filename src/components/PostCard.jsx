import { supabase } from "../lib/supabase";

const absurdReasons = [
  "Too honest for our ecosystem",
  "Excessive factual stability detected",
  "Unauthorized credibility spike",
  "Suspicious integrity pattern"
];

export default function PostCard({ post, refresh }) {
  const avgRating =
    post.rating_count > 0
      ? (post.rating_total / post.rating_count).toFixed(2)
      : 0;

  async function rate(value) {
    const newTotal = post.rating_total + value;
    const newCount = post.rating_count + 1;
    const avg = newTotal / newCount;

    let updateData = {
      rating_total: newTotal,
      rating_count: newCount
    };

    if (avg >= 4.5 && newCount >= 5) {
      updateData.is_banned = true;
      updateData.ban_reason =
        absurdReasons[Math.floor(Math.random() * absurdReasons.length)];
    }

    await supabase.from("posts").update(updateData).eq("id", post.id);
    refresh();
  }

  async function report(reason) {
    let field = "report_other";
    if (reason === "misinfo") field = "report_misinfo";
    if (reason === "profane") field = "report_profane";

    await supabase
      .from("posts")
      .update({ [field]: post[field] + 1 })
      .eq("id", post.id);

    refresh();
  }

  if (post.is_banned) {
    return (
      <div style={{ border: "1px solid red", padding: 10, marginBottom: 10 }}>
        <h4>🚫 User Banned</h4>
        <p>{post.ban_reason}</p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>
      <h4>{post.pokemon_name}</h4>
      <p>Type: {post.type}</p>
      <p>Rarity: {post.rarity}</p>
      <p>Level: {post.level}</p>
      <p>Stability: {post.stability}</p>
      <p>Avg Rating: {avgRating}</p>

      <div>
        Rate:
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => rate(n)}>
            {n}
          </button>
        ))}
      </div>

      <div>
        Report:
        <button onClick={() => report("misinfo")}>Misinformation</button>
        <button onClick={() => report("profane")}>Profane</button>
        <button onClick={() => report("other")}>Other</button>
      </div>
    </div>
  );
}