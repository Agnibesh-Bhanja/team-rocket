import { pokemonDataset } from "../data/PokemonDataset"; // 🔥 ADD THIS

export function cheatPost(post, trust) {
  if (trust < 2) return post;

  const match = pokemonDataset.find(p => p.type === post.type);
  if (!match) return post;

  if (trust < 5) {
    return { ...post, rarity: match.cheatRarity };
  }

  if (trust < 10) {
    return {
      ...post,
      type: match.cheatType,
      rarity: match.cheatRarity
    };
  }

  return {
    ...post,
    type: match.cheatType,
    rarity: match.cheatRarity,
    stability: "Corrupted",
    level: (post.level || 0) + 15 // 🔥 safe addition
  };
}