# Pokémon Finder

A modern Pokédex web app built with **Next.js 16 App Router**, **TypeScript**, and **Tailwind CSS v4** — consuming the [PokéAPI](https://pokeapi.co/) with ISR caching, server-side data fetching, and a fully responsive UI.

---

## ✨ Features

- 🔍 **Search** Pokémon by name
- 📄 **Paginated list** — 20 Pokémon per page
- 📋 **Detail page** — stats, abilities, moves, sprites (default & shiny), height, weight
- 🎨 **Type badges** with color-coded styling per Pokémon type
- ⏩ **Prev / Next navigation** between Pokémon
- ⚡ **ISR caching** — API responses cached with configurable revalidation (default 1 hour)
- 💀 **Skeleton loading** — smooth Suspense-based loading states
- 🐳 **Docker support** — production-ready with Nginx

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Data | PokéAPI (REST) |
| Rendering | React 19 Server Components + Suspense |
| Infra | Docker + Nginx |

---

## 📐 Architecture

- **Server Components** for all data fetching — zero client-side JS for page load
- **Parallel fetching** with `Promise.all` for Pokémon list details
- **ISR (Incremental Static Regeneration)** via `next: { revalidate }` on fetch calls
- **`generateMetadata`** for dynamic per-Pokémon SEO metadata
- **`not-found.tsx` / `loading.tsx`** at both route levels for proper UX fallbacks
- **Environment-configurable** API base URLs and cache TTL via `.env`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home — paginated Pokémon grid
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Root loading state
│   ├── not-found.tsx             # 404 page
│   └── pokemon/[name]/
│       ├── page.tsx              # Pokémon detail page
│       └── loading.tsx           # Detail loading state
├── components/
│   ├── SearchBar.tsx             # Client search input
│   ├── PokemonCard.tsx           # Grid card with type badges
│   ├── PokemonCardSkeleton.tsx   # Skeleton loader
│   ├── Pagination.tsx            # Page navigation
│   └── TypeBadge.tsx             # Colored type pill
├── lib/
│   ├── pokemon-api.ts            # Fetch helpers with ISR
│   └── type-colors.ts            # Type → color mapping
└── types/
    └── pokemon.ts                # TypeScript interfaces
```

---

## 🚀 Getting Started

### Local Development

```bash
git clone https://github.com/rattaroj/next-pokemon-finder.git
cd next-pokemon-finder
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
NEXT_PUBLIC_POKEAPI_BASE_URL=https://pokeapi.co/api/v2
NEXT_PUBLIC_POKEMON_IMAGE_BASE_URL=https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork
POKEMON_REVALIDATE_SECONDS=3600
```

### Run with Docker

```bash
docker-compose up -d
```

---

## 👤 Author

**Rattaroj (Ohm)**  
Senior Fullstack Developer — C# / .NET · React · Next.js · Angular · Golang  
GitHub: [github.com/rattaroj](https://github.com/rattaroj)
