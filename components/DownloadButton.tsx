import { Download, ExternalLink, FileDown } from 'lucide-react'
import Link from 'next/link'

interface DownloadButtonProps {
  fileName: string
  fileSize: string
  fileUrl: string
  labType: 'complete' | 'module' | 'scenario'
  description: string
}

const labTypeColors = {
  complete: {
    badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    gradient: 'from-purple-500 to-pink-500',
    hoverShadow: 'hover:shadow-purple-500/20 dark:hover:shadow-purple-500/10'
  },
  module: {
    badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    gradient: 'from-blue-500 to-cyan-500',
    hoverShadow: 'hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10'
  },
  scenario: {
    badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    gradient: 'from-emerald-500 to-teal-500',
    hoverShadow: 'hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/10'
  }
}

export default function DownloadButton({
  fileName,
  fileSize,
  fileUrl,
  labType,
  description
}: DownloadButtonProps) {
  const colors = labTypeColors[labType]
  
  return (
    <div className={`group relative p-6 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-transparent transition-all duration-300 hover:shadow-xl ${colors.hoverShadow}`}>
      {/* Gradient border on hover */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur`} />
      
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
              <FileDown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-blue-400 dark:group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                {fileName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">{fileSize}</span>
                <span className="text-xs text-slate-400 dark:text-slate-600">•</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${colors.badge}`}>
                  {labType}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href={fileUrl}
            download={fileName}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r ${colors.gradient} text-white font-medium text-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
          >
            <Download className="w-4 h-4" />
            Download Lab
          </a>
          <Link
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
