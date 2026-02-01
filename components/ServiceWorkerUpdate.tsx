'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ServiceWorkerUpdate() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
  const [showReload, setShowReload] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return
    }

    const checkForUpdates = () => {
      navigator.serviceWorker.ready.then(registration => {
        // Check for waiting service worker
        if (registration.waiting) {
          setWaitingWorker(registration.waiting)
          setShowReload(true)
        }

        // Listen for new service worker installing
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (!newWorker) return

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker)
              setShowReload(true)
            }
          })
        })
      })

      // Note: controllerchange listener is added only when user triggers refresh
    }

    checkForUpdates()
  }, [])

  useEffect(() => {
    if (showReload && waitingWorker) {
      toast('New version available', {
        description: 'A new version of the documentation is available.',
        action: {
          label: 'Refresh',
          onClick: () => {
            const onControllerChange = () => {
              if (refreshing) return
              setRefreshing(true)
              window.location.reload()
            }

            navigator.serviceWorker.addEventListener('controllerchange', onControllerChange, {
              once: true,
            })
            waitingWorker.postMessage({ type: 'SKIP_WAITING' })
            setShowReload(false)
          }
        },
        duration: Infinity,
        position: 'bottom-right'
      })
    }
  }, [showReload, waitingWorker])

  return null
}
