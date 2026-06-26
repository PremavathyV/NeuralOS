import { useEffect, useRef } from 'react'

/**
 * Shared IntersectionObserver instance to handle all scroll animations.
 * This avoids the overhead of creating multiple observers and prevents
 * potential memory leaks or performance degradation.
 */
let sharedObserver: IntersectionObserver | null = null

const getSharedObserver = () => {
  if (typeof window === 'undefined') return null
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          sharedObserver?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  )
  return sharedObserver
}

export function useScrollObserver<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = getSharedObserver()
    if (observer) {
      observer.observe(el)
    }

    return () => {
      if (el && observer) {
        observer.unobserve(el)
      }
    }
  }, [])

  return ref
}
