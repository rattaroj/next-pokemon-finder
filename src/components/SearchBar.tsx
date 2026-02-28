"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue = "" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    startTransition(() => {
      router.push(`/pokemon/${encodeURIComponent(trimmed.toLowerCase())}`);
    });
  }

  function handleClear() {
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-slate-400 w-5 h-5 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or number (e.g. pikachu, 25)"
          className="w-full pl-12 pr-24 py-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={isPending || !query.trim()}
          className="absolute right-2 bg-red-500 hover:bg-red-600 disabled:bg-slate-300 text-white font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
        >
          {isPending ? "..." : "Find"}
        </button>
      </div>
    </form>
  );
}
