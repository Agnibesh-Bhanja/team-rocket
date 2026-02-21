import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function CreatePost() {
  const [pokemonName, setPokemonName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in!");
      return;
    }

    const { error } = await supabase.from("posts").insert([
      {
        user_id: user.id,
        pokemon_name: pokemonName,
        type,
        location,
        size,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Post created!");
      setPokemonName("");
      setType("");
      setLocation("");
      setSize("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Post</h2>

      <input
        placeholder="Pokemon Name"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}