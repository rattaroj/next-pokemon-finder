export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 animate-pulse">
      <div className="w-full aspect-square mb-3 bg-slate-100 rounded-xl" />
      <div className="h-3 w-12 bg-slate-100 rounded mb-2" />
      <div className="h-4 w-3/4 bg-slate-100 rounded mb-3" />
      <div className="flex gap-1">
        <div className="h-5 w-14 bg-slate-100 rounded-full" />
        <div className="h-5 w-14 bg-slate-100 rounded-full" />
      </div>
    </div>
  );
}

export function PokemonGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  );
}
