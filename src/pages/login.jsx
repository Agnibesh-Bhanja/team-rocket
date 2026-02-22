import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import pokeball from "../assets/pokeball.png"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  // 🔥 Get public URL from Supabase Storage
  const musicUrl = supabase
    .storage
    .from("assets")   // 👈 replace with your bucket name
    .getPublicUrl("Team-rocket.mp3") // 👈 replace with your file name
    .data.publicUrl;

  // 🎵 Play music after first user interaction
  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.8;
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", playMusic);
    };

    document.addEventListener("click", playMusic);

    return () => {
      document.removeEventListener("click", playMusic);
    };
  }, []);

  async function handleLogin(type) {
    setLoading(true);
    
    const { data, error } = type === "signup" 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
        navigate("/"); 
      }, 2000);
    }
  }

  return (
    <div className="login-page">

      {/* 🎵 Background Music */}
      <audio ref={audioRef} loop>
        <source src={musicUrl} type="audio/mpeg" />
      </audio>

      {/* LOADING OVERLAY */}
      {loading && (
        <div className="loading-overlay">
          <img src={pokeball} alt="Loading..." className="spinning-pokeball" />
          <p className="pixel-font" style={{ marginTop: '20px', color: '#facc15' }}>
            SNORLAX GRUNT...
          </p>
        </div>
      )}

      <div className="login-left">
        <div className="login-card">
          <h2 className="login-title">Welcome to team rocket!</h2>
          
          <input 
            className="login-input" 
            type="email" 
            placeholder="Email Address" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          
          <input 
            className="login-input" 
            type="password" 
            placeholder="Passcode" 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button 
            className="login-btn primary" 
            onClick={() => handleLogin("login")}
            disabled={loading}
          >
            SIGN IN
          </button>

          <button 
            className="login-btn secondary" 
            onClick={() => handleLogin("signup")}
            disabled={loading}
          >
            NEW RECRUIT
          </button>
        </div>
      </div>

      <div className="login-right">
        <img 
          src="https://pngimg.com/uploads/pokemon/pokemon_PNG28.png" 
          alt="Rocket" 
        />
      </div>
    </div>
  );
}