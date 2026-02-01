export default function RootLoading() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar Skeleton */}
      <aside className="hidden lg:block w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="p-6 animate-pulse">
          {/* Search bar skeleton */}
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6" />
          
          {/* Navigation items skeleton */}
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                {i % 3 === 0 && (
                  <div className="ml-4 space-y-2">
                    <div className="h-5 bg-slate-100 dark:bg-slate-800/50 rounded w-5/6" />
                    <div className="h-5 bg-slate-100 dark:bg-slate-800/50 rounded w-4/6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 animate-pulse">
          {/* Breadcrumb skeleton */}
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-64 mb-8" />
          
          {/* Title skeleton */}
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-4" />
          
          {/* Description skeleton */}
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2" />
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-5/6 mb-8" />
          
          {/* Content skeletons */}
          <div className="space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-11/12" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded w-full mt-6" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-10/12" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-9/12" />
          </div>
        </div>
      </main>

      {/* Right TOC Skeleton (hidden on smaller screens) */}
      <aside className="hidden xl:block w-64 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="sticky top-4 p-6 animate-pulse">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-32 mb-4" />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-slate-200 dark:bg-slate-800 rounded"
                style={{ width: `${60 + (i % 3) * 10}%`, marginLeft: `${(i % 2) * 12}px` }}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
