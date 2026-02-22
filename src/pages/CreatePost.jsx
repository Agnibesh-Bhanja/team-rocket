import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import pokeball from "../assets/pokeball.png";

export default function CreatePost() {
  const [form, setForm] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const audioRef = useRef(null);

  const musicUrl = supabase
    .storage
    .from("assets")
    .getPublicUrl("Fall.mp3")
    .data.publicUrl;

  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", playMusic);
    };

    document.addEventListener("click", playMusic);
    return () => document.removeEventListener("click", playMusic);
  }, []);

  async function submit() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Login required");
    if (!imageFile) return alert("Please upload a Pokémon image");

    setUploading(true);
    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("pokemon-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      alert(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("pokemon-images")
      .getPublicUrl(fileName);

    await supabase.from("posts").insert([
      { ...form, user_id: user.id, image_url: data.publicUrl }
    ]);

    alert("Intel Shared! 🚀");
    setUploading(false);
  }

  return (
    <div className="create-page">

      {/* 🎵 Background Music */}
      <audio ref={audioRef} loop>
        <source src={musicUrl} type="audio/mpeg" />
      </audio>

      {/* LEFT - FORM */}
      <div className="create-form-card">
        <h2 className="create-heading">UPLOAD INTEL!</h2>

        <input
          className="create-input"
          placeholder="Pokémon Name"
          onChange={e => setForm({ ...form, pokemon_name: e.target.value })}
        />

        <input
          className="create-input"
          placeholder="Type"
          onChange={e => setForm({ ...form, type: e.target.value })}
        />

        <input
          className="create-input"
          placeholder="Level"
          type="number"
          onChange={e => setForm({ ...form, level: parseInt(e.target.value) })}
        />

        <input
          className="create-input"
          placeholder="Rarity"
          onChange={e => setForm({ ...form, rarity: e.target.value })}
        />

        <input
          className="create-input"
          placeholder="Stability"
          onChange={e => setForm({ ...form, stability: e.target.value })}
        />

        <label className="upload-label">
          {imageFile ? "Image Ready" : "Select Image"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              setImageFile(file);
              if (file) setPreviewUrl(URL.createObjectURL(file));
            }}
          />
        </label>

        <button onClick={submit} className="create-btn">
          {uploading ? "SCANNING..." : "CREATE POST"}
        </button>
      </div>

      {/* CENTER - FLOATING POKEBALL */}
      <div className="create-center">
        <img src={pokeball} alt="pokeball" />
      </div>

      {/* RIGHT - IMAGE PREVIEW */}
      <div className="create-image-side">
        {previewUrl
          ? <img src={previewUrl} alt="Preview" />
          : <div className="image-placeholder">Waiting for Signal...</div>}
      </div>

    </div>
  );
}