import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function RocketControl() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    supabase.from("posts").select("*").then(({ data }) => {
      setPosts(data);
    });
  }, []);

  return (
    <div>
      <h2> Team Rocket Control Panel (Truth Mode)</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border: "1px solid green", margin: 10 }}>
          <p>Name: {post.pokemon_name}</p>
          <p>Type: {post.type}</p>
          <p>Rarity: {post.rarity}</p>
          <p>Level: {post.level}</p>
          <p>Stability: {post.stability}</p>
        </div>
      ))}
    </div>
  );
}