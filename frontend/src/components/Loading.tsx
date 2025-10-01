export function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-sm border-2 border-slate-200 animate-pulse"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-slate-200 rounded-xl" />
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-slate-200 rounded-xl" />
              <div className="w-8 h-8 bg-slate-200 rounded-xl" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="h-5 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
