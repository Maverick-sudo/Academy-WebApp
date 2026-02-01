export default function HealthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-center animate-pulse">
        <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-4" />
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-32 mx-auto" />
      </div>
    </div>
  )
}
