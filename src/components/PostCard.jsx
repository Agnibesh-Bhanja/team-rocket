import { supabase } from "../lib/supabase";

export default function PostCard({ post, refresh }) {
  const avgRating = post.rating_count > 0 ? (post.rating_total / post.rating_count).toFixed(1) : "0.0";

  async function rate(value) {
    const { error } = await supabase.from("posts").update({ 
      rating_total: (post.rating_total || 0) + value,
      rating_count: (post.rating_count || 0) + 1 
    }).eq("id", post.id);
    if (!error) refresh();
  }

  async function report(type) {
    const field = type === "misinfo" ? "report_misinfo" : "report_profane";
    const { error } = await supabase.from("posts").update({ 
      [field]: (post[field] || 0) + 1 
    }).eq("id", post.id);
    if (!error) refresh();
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <h3 className="post-pokemon-name">{post.pokemon_name}</h3>
        <span className="trust-score">★ {avgRating}</span>
      </div>

      {post.image_url && (
        <div className="post-image-box">
          <img src={post.image_url} alt="pokemon" className="post-img" />
        </div>
      )}

      <div className="post-stats-grid">
        <div className="stat-item">LVL: <span className="stat-value">{post.level}</span></div>
        <div className="stat-item">TYPE: <span className="stat-value">{post.type}</span></div>
        <div className="stat-item">RARITY: <span className="stat-value">{post.rarity}</span></div>
        <div className="stat-item">STABILITY: <span className="stat-value">{post.stability}</span></div>
      </div>

      <div className="post-actions">
        <p style={{ fontSize: '10px', color: '#facc15' }}>VERIFY INTEL:</p>
        <div className="star-group">
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} onClick={() => rate(n)} className="star-btn">{n}</button>
          ))}
        </div>
        <div className="report-group">
          <button onClick={() => report("misinfo")} className="report-btn">REPORT MISINFO</button>
          <button onClick={() => report("profane")} className="report-btn">PROFANE</button>
        </div>
      </div>
    </div>
  );
}