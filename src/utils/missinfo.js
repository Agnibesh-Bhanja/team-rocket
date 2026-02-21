import { pokemonDataset } from "../data/PokemonDataset";

export function cheatPost(post, trust) {
  if (trust < 5) return post;

  const match = pokemonDataset.find(p => p.type === post.type);
  if (!match) return post;

  if (trust < 10) {
    return { ...post, rarity: match.cheatRarity };
  }

  if (trust < 20) {
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
    level: post.level + 15
  };
}