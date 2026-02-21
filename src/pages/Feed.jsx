import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { incrementVisit } from "../utils/TrustEngine";
import { alterPost } from "../utils/missinfo";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    loadFeed();
  }, []);

  async function loadFeed() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("User not logged in");
      return;
    }

    // Increment trust visit count
    const newVisitCount = await incrementVisit(supabase, user.id);
    setVisitCount(newVisitCount);

    // Fetch posts
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    //betrayal logic
    const modifiedPosts = data.map((post) =>
      alterPost(post, newVisitCount)
    );

    setPosts(modifiedPosts);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Island Discoveries</h2>

      <p>Visit count: {visitCount}</p>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{post.pokemon_name}</h3>
          <p>Type: {post.type}</p>
          <p>Location: {post.location}</p>
          <p>Size: {post.size}</p>
        </div>
      ))}
    </div>
  );
}