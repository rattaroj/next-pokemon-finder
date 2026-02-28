import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-8xl mb-6">😵</div>
      <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
        Pokemon Not Found
      </h2>
      <p className="text-slate-500 mb-8 max-w-sm">
        That Pokemon doesn&apos;t exist in our Pokedex. Check the name or number
        and try again.
      </p>
      <Link
        href="/"
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-2xl transition-colors"
      >
        Back to Pokedex
      </Link>
    </div>
  );
}
