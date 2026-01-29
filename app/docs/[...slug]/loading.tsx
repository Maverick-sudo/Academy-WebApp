export default function DocsLoading() {
  return (
    <div className="w-full max-w-4xl py-8 lg:py-12 animate-pulse">
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
  )
}
