'use client'

import { useState, useEffect, useRef, memo } from 'react'
import { useScrollObserver } from '@/hooks/useScrollObserver'

const STATS = [
  { value: 50,  suffix: 'ms',  label: 'p99 Latency',       sub: 'across all providers'   },
  { value: 99,  suffix: '.9%', label: 'Uptime SLA',        sub: 'enterprise guarantee'    },
  { value: 12,  suffix: 'B+',  label: 'Inferences / Mo',   sub: 'growing 40% MoM'        },
  { value: 200, suffix: '+',   label: 'Integrations',      sub: 'any stack, any tool'    },
]

/* Animated number — isolated memo to prevent parent re-renders */
const AnimatedNumber = memo(function AnimatedNumber({
  target, duration = 1800,
}: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    startRef.current = performance.now()
    function tick(now: number) {
      const p = Math.min((now - startRef.current) / duration, 1)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setCount(Math.round(eased * target))
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return <>{count}</>
})

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const cardRef    = useScrollObserver<HTMLDivElement>()
  const triggerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = triggerRef.current
    if (!el || active) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [active])

  return (
    <div
      ref={cardRef}
      className={`observe-fade delay-${index * 100 + 100} group relative glass gradient-border rounded-3xl p-8 text-center overflow-hidden cursor-default`}
      style={{ transition: 'transform 175ms ease-out, box-shadow 175ms ease-out' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.035) translateY(-4px)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = '' }}
    >
      <div ref={triggerRef} className="sr-only" />

      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 rounded-3xl"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,200,1,0.07) 0%, transparent 68%)',
          transition: 'opacity 175ms ease-out',
        }}
      />

      <div className="relative z-10">
        <div className="font-mono font-extrabold tabular-nums text-forsythia mb-2" style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)' }}>
          {active ? <AnimatedNumber target={stat.value} /> : 0}
          {stat.suffix}
        </div>
        <div className="font-mono font-semibold text-base text-arctic tracking-tight mb-1">
          {stat.label}
        </div>
        <div className="text-xs text-[rgba(241,246,244,0.38)] font-sans">
          {stat.sub}
        </div>
      </div>
    </div>
  )
}

export default function Statistics() {
  const headRef = useScrollObserver<HTMLDivElement>()

  return (
    <section id="stats" aria-label="Platform statistics" className="relative py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(17,76,90,0.11) 0%, transparent 65%)' }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headRef} className="observe-fade text-center mb-16">
          <p className="text-[11px] font-mono font-semibold text-forsythia tracking-[0.22em] uppercase mb-5">
            By the Numbers
          </p>
          <h2
            className="font-mono font-extrabold text-arctic tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            Performance you can{' '}
            <span className="shimmer-text">measure.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
