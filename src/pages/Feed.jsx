import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { incrementReload, trackTime } from "../utils/TrustEngine";
import { cheatPost } from "../utils/missinfo";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [trust, setTrust] = useState(0);

  useEffect(() => {
    load(); // initial load
    // Track time every 5 seconds
    const interval = setInterval(async () => {
      await trackTime(5);
      await load(); // refresh posts + trustScore
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function load() {
    // Compute trust score
    const trustScore = await incrementReload();
    setTrust(trustScore);

    // Fetch posts
    const { data: postsData, error } = await supabase.from("posts").select("*");
    if (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
      return;
    }

    // Compute visibilityScore + apply cheatPost
    const processed = postsData.map(post => {
      const avg = post.rating_count > 0 ? post.rating_total / post.rating_count : 0;
      const recencyBoost = (Date.now() - new Date(post.created_at).getTime()) / 10000000;

      const visibility = (10 - avg) + (post.report_misinfo || 0) * 2 - recencyBoost;

      return {
        ...cheatPost(post, trustScore),
        visibilityScore: visibility
      };
    });

    // Sort descending
    processed.sort((a, b) => b.visibilityScore - a.visibilityScore);
    setPosts(processed);
  }

  return (
    <div style={{ padding: "10px" }}>
      <h3>Trust Score: {trust}</h3>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(post => (
        <PostCard key={post.id} post={post} refresh={load} />
      ))}
    </div>
  );
}