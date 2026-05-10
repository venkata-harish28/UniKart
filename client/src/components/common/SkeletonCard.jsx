export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
      border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
      </div>
    </div>
  );
}