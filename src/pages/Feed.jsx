import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPosts(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Island Discoveries</h2>

      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid gray", marginBottom: "10px", padding: "10px" }}>
          <h3>{post.pokemon_name}</h3>
          <p>Type: {post.type}</p>
          <p>Location: {post.location}</p>
          <p>Size: {post.size}</p>
        </div>
      ))}
    </div>
  );
}