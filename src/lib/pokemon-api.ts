import type { Pokemon, PokemonListResponse } from "@/types/pokemon";

const BASE_URL = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL ?? "https://pokeapi.co/api/v2";
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_POKEMON_IMAGE_BASE_URL ?? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
const REVALIDATE = parseInt(process.env.POKEMON_REVALIDATE_SECONDS ?? "3600", 10);

export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    { next: { revalidate: REVALIDATE } }
  );
  if (!res.ok) throw new Error("Failed to fetch Pokemon list");
  return res.json();
}

export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`, {
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`Failed to fetch Pokemon: ${nameOrId}`);
  return res.json();
}

export async function searchPokemon(query: string): Promise<Pokemon | null> {
  try {
    return await getPokemon(query.toLowerCase().trim());
  } catch {
    return null;
  }
}

export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

export function getPokemonImageUrl(id: number): string {
  return `${IMAGE_BASE_URL}/${id}.png`;
}
