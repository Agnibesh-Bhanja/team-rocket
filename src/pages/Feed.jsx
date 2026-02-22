import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import PostCard from "../components/PostCard";
import { incrementReload, trackTime } from "../utils/TrustEngine";
import { cheatPost } from "../utils/missinfo";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [trust, setTrust] = useState(0);
  const audioRef = useRef(null);

  const musicUrl = supabase
    .storage
    .from("assets")
    .getPublicUrl("Fall.mp3")
    .data.publicUrl;

  useEffect(() => {
    load();

    const interval = setInterval(async () => {
      await trackTime(5);
      await load();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🎵 Play music after first interaction
  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", playMusic);
    };

    document.addEventListener("click", playMusic);

    return () => {
      document.removeEventListener("click", playMusic);
    };
  }, []);

  async function load() {
    const trustScore = await incrementReload();
    setTrust(trustScore);

    console.log("Current Trust Score:", trustScore); // 🔍 Debug

    const { data: postsData, error } = await supabase
      .from("posts")
      .select("*");

    if (error || !postsData) {
      setPosts([]);
      return;
    }

    const processed = postsData.map(post => {
      const avg =
        post.rating_count > 0
          ? post.rating_total / post.rating_count
          : 0;

      const visibility =
        (10 - avg) +
        (post.report_misinfo || 0) * 2 +
        (post.report_profane || 0);

      // 🔥 FIXED corruption logic (no double spread)
      const modifiedPost = cheatPost(post, trustScore);

      return {
        ...modifiedPost,
        visibilityScore: visibility,
        calculatedAvg: avg
      };
    });

    processed.sort((a, b) => b.visibilityScore - a.visibilityScore);
    setPosts(processed);
  }

  return (
    <div className="container">

      {/* 🎵 Background Music */}
      <audio ref={audioRef} loop>
        <source src={musicUrl} type="audio/mpeg" />
      </audio>

      <div className="feed-header">
        <h2
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: "25px",
            color: "#facc15"
          }}
        >
          TEAM ROCKET INTEL FEED
        </h2>

        <p style={{ marginTop: "8px" }}>
          Trust Score: <span className="trust-score">{trust}</span>
        </p>
      </div>

      <div className="posts-list">
        {posts.length === 0 ? (
          <div className="post-card" style={{ textAlign: "center" }}>
            Scanning for signals...
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="post-wrapper">
              <PostCard post={post} refresh={load} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}