export function SkeletonCard() {
  return (
    <div className="card p-6 animate-pulse">
      <div className="h-4 bg-coffee-200 dark:bg-coffee-700 rounded w-3/4 mb-4" />
      <div className="h-3 bg-coffee-200 dark:bg-coffee-700 rounded w-1/2 mb-3" />
      <div className="h-3 bg-coffee-200 dark:bg-coffee-700 rounded w-2/3 mb-3" />
      <div className="h-8 bg-coffee-200 dark:bg-coffee-700 rounded w-1/4 mt-4" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="card overflow-hidden animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-coffee-100 dark:border-coffee-800 last:border-0">
          <div className="h-4 bg-coffee-200 dark:bg-coffee-700 rounded w-1/4" />
          <div className="h-4 bg-coffee-200 dark:bg-coffee-700 rounded w-1/4" />
          <div className="h-4 bg-coffee-200 dark:bg-coffee-700 rounded w-1/6" />
          <div className="h-4 bg-coffee-200 dark:bg-coffee-700 rounded w-1/6" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="card p-6">
          <div className="h-3 bg-coffee-200 dark:bg-coffee-700 rounded w-1/2 mb-3" />
          <div className="h-8 bg-coffee-200 dark:bg-coffee-700 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
}
