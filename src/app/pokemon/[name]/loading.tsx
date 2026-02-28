export default function PokemonLoading() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-6 w-32 bg-slate-200 rounded mb-6" />
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-slate-100 p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-48 h-48 bg-slate-200 rounded-2xl flex-shrink-0" />
          <div className="flex-1 w-full">
            <div className="h-5 w-16 bg-slate-200 rounded mb-3" />
            <div className="h-10 w-48 bg-slate-200 rounded mb-4" />
            <div className="flex gap-2 mb-4">
              <div className="h-7 w-20 bg-slate-200 rounded-full" />
              <div className="h-7 w-20 bg-slate-200 rounded-full" />
            </div>
            <div className="flex gap-6">
              <div className="h-5 w-16 bg-slate-200 rounded" />
              <div className="h-5 w-16 bg-slate-200 rounded" />
              <div className="h-5 w-16 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <div className="h-4 w-20 bg-slate-100 rounded" />
                  <div className="h-4 w-8 bg-slate-100 rounded" />
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-6 w-24 bg-slate-100 rounded" />
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-8 w-24 bg-slate-100 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
