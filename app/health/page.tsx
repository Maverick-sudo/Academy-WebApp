import Link from 'next/link'
import { getContentHealth } from '@/lib/content'

export const metadata = {
  title: 'Content Health | Academy',
  description: 'Health check for documentation content sources',
}

export default function HealthPage() {
  const health = getContentHealth()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex h-3 w-3 rounded-full ${
              health.ok ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            aria-hidden="true"
          />
          <h1 className="text-3xl font-semibold">Content Health</h1>
        </div>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Quick status check for repository content loading and parsing.
        </p>

        <div className="mt-6 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1">
              Status: {health.ok ? 'OK' : 'Warning'}
            </span>
            <span className="rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1">
              Total docs: {health.totalDocs}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">Repositories</h2>
            <ul className="mt-3 space-y-3">
              {health.repos.map(repo => (
                <li
                  key={repo.name}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-slate-200 dark:border-slate-800 px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{repo.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Docs: {repo.docCount}
                      {repo.readmeExists ? ' · README found' : ' · README missing'}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide ${
                      repo.exists && repo.docCount > 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {repo.exists && repo.docCount > 0 ? 'Ready' : 'Check'}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {health.errors.length > 0 && (
            <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200">
              <h3 className="font-semibold">Issues detected</h3>
              <ul className="mt-2 list-disc pl-5">
                {health.errors.map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link
            href="/docs"
            className="text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Go to docs
          </Link>
        </div>
      </div>
    </div>
  )
}
