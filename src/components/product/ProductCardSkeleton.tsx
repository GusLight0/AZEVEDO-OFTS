export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex gap-1 mt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-5 w-7 rounded" />
          ))}
        </div>
        <div className="skeleton h-5 w-24 rounded mt-2" />
        <div className="skeleton h-10 w-full rounded-lg mt-3" />
      </div>
    </div>
  );
}
