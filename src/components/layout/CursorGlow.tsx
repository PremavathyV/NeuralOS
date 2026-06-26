'use client'

import { useEffect, useRef } from 'react'

/**
 * Full-page cursor glow dot — follows mouse using CSS custom properties.
 * Uses WAAPI / rAF for 60fps movement without triggering React re-renders.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return

    let x = 0, y = 0
    let raf = 0

    function update(e: MouseEvent) {
      x = e.clientX
      y = e.clientY
    }

    function paint() {
      el!.style.left = x + 'px'
      el!.style.top  = y + 'px'
      raf = requestAnimationFrame(paint)
    }

    window.addEventListener('mousemove', update, { passive: true })
    raf = requestAnimationFrame(paint)
    return () => {
      window.removeEventListener('mousemove', update)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
