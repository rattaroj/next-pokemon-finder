import { Suspense } from "react";
import { getPokemonList, getPokemon, getPokemonIdFromUrl } from "@/lib/pokemon-api";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";
import Pagination from "@/components/Pagination";
import { PokemonGridSkeleton } from "@/components/PokemonCardSkeleton";

const PAGE_SIZE = 20;

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

async function PokemonGrid({ page }: { page: number }) {
  const offset = (page - 1) * PAGE_SIZE;
  const listData = await getPokemonList(PAGE_SIZE, offset);
  const totalPages = Math.ceil(listData.count / PAGE_SIZE);

  const pokemonDetails = await Promise.all(
    listData.results.map(async (item) => {
      const id = getPokemonIdFromUrl(item.url);
      try {
        const detail = await getPokemon(id);
        return { id, name: item.name, types: detail.types.map((t) => t.type.name) };
      } catch {
        return { id, name: item.name, types: [] };
      }
    })
  );

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemonDetails.map((p) => (
          <PokemonCard key={p.id} id={p.id} name={p.name} types={p.types} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-2">
          Pokemon Finder
        </h1>
        <p className="text-slate-500 mb-6">
          Discover and explore all{" "}
          <span className="text-red-500 font-semibold">Pokemon</span>
        </p>
        <SearchBar />
      </div>

      <Suspense fallback={<PokemonGridSkeleton count={PAGE_SIZE} />}>
        <PokemonGrid page={page} />
      </Suspense>
    </div>
  );
}
