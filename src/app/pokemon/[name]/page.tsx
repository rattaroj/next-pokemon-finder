import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Ruler, Weight, Zap, Shield } from "lucide-react";
import { getPokemon, getPokemonImageUrl } from "@/lib/pokemon-api";
import TypeBadge from "@/components/TypeBadge";
import { getStatColor } from "@/lib/type-colors";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export async function generateMetadata({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(decodeURIComponent(name)).catch(() => null);
  if (!pokemon) return { title: "Pokemon Not Found" };
  return {
    title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} | Pokedex`,
    description: `View stats, types, and details for ${pokemon.name}`,
  };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(decodeURIComponent(name)).catch(() => null);

  if (!pokemon) notFound();

  const imageUrl = getPokemonImageUrl(pokemon.id);
  const shinyUrl =
    pokemon.sprites.other["official-artwork"].front_shiny ?? imageUrl;
  const paddedId = String(pokemon.id).padStart(3, "0");
  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const totalStats = pokemon.stats.reduce((s, stat) => s + stat.base_stat, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Pokedex
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={pokemon.name}
              fill
              className="object-contain drop-shadow-xl"
              priority
              sizes="192px"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-slate-400 font-bold text-lg mb-1">#{paddedId}</p>
            <h1 className="text-4xl font-extrabold text-slate-800 capitalize mb-3">
              {pokemon.name}
            </h1>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
              {pokemon.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} />
              ))}
            </div>
            <div className="flex gap-6 justify-center sm:justify-start text-slate-600">
              <div className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">
                  {(pokemon.height / 10).toFixed(1)} m
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Weight className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">
                  {pokemon.base_experience} XP
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Base Stats */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" /> Base Stats
            </h2>
            <div className="space-y-3">
              {pokemon.stats.map((s) => (
                <div key={s.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-slate-500 capitalize font-medium">
                      {STAT_LABELS[s.stat.name] ?? s.stat.name}
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      {s.base_stat}
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getStatColor(s.stat.name)} transition-all`}
                      style={{ width: `${Math.min(100, (s.base_stat / 255) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-100 flex justify-between">
                <span className="text-sm font-bold text-slate-600">Total</span>
                <span className="text-sm font-bold text-slate-800">{totalStats}</span>
              </div>
            </div>
          </div>

          {/* Abilities & Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-3">Abilities</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                  <span
                    key={a.ability.name}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium capitalize border ${
                      a.is_hidden
                        ? "border-dashed border-slate-300 text-slate-400 bg-slate-50"
                        : "border-slate-200 text-slate-700 bg-slate-50"
                    }`}
                  >
                    {a.ability.name.replace("-", " ")}
                    {a.is_hidden && (
                      <span className="ml-1 text-xs text-slate-400">(hidden)</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-3">Sprites</h2>
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                    {pokemon.sprites.front_default ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={pokemon.sprites.front_default}
                        alt={`${pokemon.name} sprite`}
                        className="w-16 h-16 object-contain image-rendering-pixelated"
                        style={{ imageRendering: "pixelated" }}
                      />
                    ) : (
                      <span className="text-slate-300 text-xs">N/A</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">Default</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                    {pokemon.sprites.front_shiny ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={pokemon.sprites.front_shiny}
                        alt={`${pokemon.name} shiny sprite`}
                        className="w-16 h-16 object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                    ) : (
                      <span className="text-slate-300 text-xs">N/A</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">Shiny</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-3">Moves</h2>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {pokemon.moves.slice(0, 30).map((m) => (
                  <span
                    key={m.move.name}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 capitalize"
                  >
                    {m.move.name.replace(/-/g, " ")}
                  </span>
                ))}
                {pokemon.moves.length > 30 && (
                  <span className="px-2.5 py-1 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-xs text-slate-400">
                    +{pokemon.moves.length - 30} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-6 sm:px-8 pb-8 flex gap-3 justify-between">
          {pokemon.id > 1 && (
            <Link
              href={`/pokemon/${pokemon.id - 1}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> #{String(pokemon.id - 1).padStart(3, "0")}
            </Link>
          )}
          <Link
            href={`/pokemon/${pokemon.id + 1}`}
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium"
          >
            #{String(pokemon.id + 1).padStart(3, "0")} <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
