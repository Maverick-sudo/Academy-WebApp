import { ReactNode } from 'react'
import { Info, Lightbulb, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react'

export type CalloutType = 'note' | 'tip' | 'warning' | 'danger' | 'success'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

const calloutConfig = {
  note: {
    icon: Info,
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    titleColor: 'text-blue-900 dark:text-blue-100',
    textColor: 'text-blue-800 dark:text-blue-200',
  },
  tip: {
    icon: Lightbulb,
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    borderColor: 'border-green-200 dark:border-green-800',
    iconColor: 'text-green-600 dark:text-green-400',
    titleColor: 'text-green-900 dark:text-green-100',
    textColor: 'text-green-800 dark:text-green-200',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
    titleColor: 'text-yellow-900 dark:text-yellow-100',
    textColor: 'text-yellow-800 dark:text-yellow-200',
  },
  danger: {
    icon: AlertCircle,
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    borderColor: 'border-red-200 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400',
    titleColor: 'text-red-900 dark:text-red-100',
    textColor: 'text-red-800 dark:text-red-200',
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    titleColor: 'text-emerald-900 dark:text-emerald-100',
    textColor: 'text-emerald-800 dark:text-emerald-200',
  },
}

export default function Callout({ type = 'note', title, children }: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon
  const defaultTitle = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <div className={`my-6 rounded-lg border-l-4 ${config.borderColor} ${config.bgColor} overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            {(title || defaultTitle) && (
              <h4 className={`font-semibold mb-2 ${config.titleColor}`}>
                {title || defaultTitle}
              </h4>
            )}
            <div className={`text-sm leading-relaxed ${config.textColor} prose-sm prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
