import Image from "next/image";
import Link from "next/link";
import { getPokemonImageUrl } from "@/lib/pokemon-api";
import TypeBadge from "@/components/TypeBadge";

interface PokemonCardProps {
  id: number;
  name: string;
  types?: string[];
}

export default function PokemonCard({ id, name, types = [] }: PokemonCardProps) {
  const imageUrl = getPokemonImageUrl(id);
  const paddedId = String(id).padStart(3, "0");

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group">
        <div className="relative w-full aspect-square mb-3 bg-slate-50 rounded-xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-200"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
        <p className="text-xs text-slate-400 font-medium mb-1">#{paddedId}</p>
        <h3 className="font-bold text-slate-800 capitalize text-base mb-2 truncate">{name}</h3>
        {types.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {types.map((t) => (
              <TypeBadge key={t} type={t} size="sm" />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
