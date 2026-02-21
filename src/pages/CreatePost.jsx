import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function CreatePost() {
  const [form, setForm] = useState({});

  async function submit() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Login required");

    await supabase.from("posts").insert([
      {
        ...form,
        user_id: user.id
      }
    ]);

    alert("Posted!");
  }

  return (
    <div>
      <input placeholder="Name" onChange={e => setForm({...form, pokemon_name: e.target.value})} />
      <input placeholder="Type" onChange={e => setForm({...form, type: e.target.value})} />
      <input placeholder="Location" onChange={e => setForm({...form, location: e.target.value})} />
      <input placeholder="Size" onChange={e => setForm({...form, size: e.target.value})} />
      <input placeholder="Level" onChange={e => setForm({...form, level: parseInt(e.target.value)})} />
      <input placeholder="Rarity" onChange={e => setForm({...form, rarity: e.target.value})} />
      <input placeholder="Stability" onChange={e => setForm({...form, stability: e.target.value})} />
      <button onClick={submit}>Create</button>
    </div>
  );
}