import { PokemonGridSkeleton } from "@/components/PokemonCardSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Pokemon Finder</h1>
        <div className="h-6 w-48 bg-slate-100 rounded animate-pulse mx-auto mb-6" />
        <div className="h-14 max-w-xl mx-auto bg-slate-100 rounded-2xl animate-pulse" />
      </div>
      <PokemonGridSkeleton count={20} />
    </div>
  );
}
