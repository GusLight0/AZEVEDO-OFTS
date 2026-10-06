export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white">
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="flex flex-1 flex-col p-3">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="mt-1 space-y-1">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-3/4 rounded" />
        </div>
        <div className="mt-auto pt-2">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton mt-1 h-5 w-24 rounded" />
          <div className="skeleton mt-2 h-3 w-28 rounded" />
        </div>
      </div>
    </div>
  );
}
