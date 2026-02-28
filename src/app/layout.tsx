import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokemon Finder",
  description: "Find and explore your favorite Pokemon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <header className="bg-blue-600 shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 h-16">
              <div className="w-8 h-8 rounded-full bg-white border-4 border-gray-800 relative flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-800" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-gray-800 z-10" />
              </div>
              <a href="/" className="text-white font-bold text-xl tracking-wide hover:opacity-90 transition-opacity">
                Pokedex
              </a>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="mt-16 border-t border-slate-200 py-6 text-center text-slate-400 text-sm">
          Data provided by{" "}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-600 font-medium"
          >
            PokeAPI
          </a>
        </footer>
      </body>
    </html>
  );
}
