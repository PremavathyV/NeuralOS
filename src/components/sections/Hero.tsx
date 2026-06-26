'use client'

import { useEffect, useRef } from 'react'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { ArrowTrendingUpIcon, ChartPieIcon, CubeIcon, LinkSolidIcon } from '@/components/icons'

/* ── Animated wave bars ─────────────────────────────────────── */
function WaveBars() {
  return (
    <span className="inline-flex items-end gap-[3px] h-4 align-middle mx-2">
      {[1, 1.6, 1.2, 1.8, 1.3].map((h, i) => (
        <span
          key={i}
          className="block w-[3px] rounded-full bg-forsythia"
          style={{
            height: `${h * 10}px`,
            animation: `wave 1s ease-in-out ${i * 0.1}s infinite`,
          }}
        />
      ))}
    </span>
  )
}

/* ── Floating glass stat card ────────────────────────────────── */
function FloatCard({
  className = '',
  style,
  children,
}: {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <div
      className={`absolute glass gradient-border rounded-2xl px-4 py-3 pointer-events-none will-transform gpu ${className}`}
      style={{ animation: 'float 5s ease-in-out infinite', ...style }}
    >
      {children}
    </div>
  )
}

/* ── Mini sparkline ──────────────────────────────────────────── */
function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values)
  const w = 80, h = 28
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - (v / max) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline
        points={pts}
        fill="none"
        stroke="#FFC801"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <polyline
        points={`0,${h} ${pts} ${w},${h}`}
        fill="url(#sparkFill)"
        strokeWidth="0"
        opacity="0.15"
      />
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC801" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── Trusted logo strip ──────────────────────────────────────── */
const LOGOS = ['Anthropic', 'OpenAI', 'Mistral', 'Cohere', 'Together AI', 'Scale AI']

export default function Hero() {
  const ctaRef  = useMagneticButton<HTMLAnchorElement>(0.3)
  const demoRef = useMagneticButton<HTMLAnchorElement>(0.3)
  const bgRef   = useRef<HTMLDivElement>(null)

  /* Parallax bg on mousemove — GPU transform only */
  useEffect(() => {
    let rafId = 0
    let tx = 0, ty = 0
    function onMove(e: MouseEvent) {
      tx = (e.clientX / window.innerWidth  - 0.5) * 28
      ty = (e.clientY / window.innerHeight - 0.5) * 18
    }
    function tick() {
      if (bgRef.current) bgRef.current.style.transform = `translate(${tx}px,${ty}px)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  /* Page-load entrance: stagger children via CSS animation-delay */
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20"
      aria-label="Hero — NeuralOS AI Platform"
    >
      {/* ── Animated gradient background ──────────────────────── */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none will-transform gpu"
      >
        {/* Gold bloom */}
        <div
          className="absolute rounded-full animate-pulse-glow"
          style={{
            top: '-18%', left: '8%',
            width: 720, height: 720,
            background: 'radial-gradient(circle, rgba(255,200,1,0.10) 0%, transparent 65%)',
          }}
        />
        {/* Teal right */}
        <div
          className="absolute rounded-full"
          style={{
            top: '15%', right: '-8%',
            width: 560, height: 560,
            background: 'radial-gradient(circle, rgba(17,76,90,0.28) 0%, transparent 65%)',
          }}
        />
        {/* Orange bloom bottom */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: '-12%', left: '28%',
            width: 640, height: 380,
            background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Second teal mid */}
        <div
          className="absolute rounded-full"
          style={{
            top: '45%', left: '-10%',
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(17,76,90,0.15) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Background grid ───────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-grid opacity-100" />

      {/* ── Orbiting particles (decorative) ──────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[
          { size: 3, color: '#FFC801', top: '22%', left: '18%', dur: '7s', delay: '0s' },
          { size: 2, color: '#F5A623', top: '65%', left: '75%', dur: '9s', delay: '2s' },
          { size: 4, color: '#114C5A', top: '40%', left: '85%', dur: '6s', delay: '1s' },
          { size: 2, color: '#FFC801', top: '78%', left: '22%', dur: '8s', delay: '3s' },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.size, height: p.size,
              background: p.color,
              top: p.top, left: p.left,
              opacity: 0.5,
              animation: `float ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* ── CONTENT ──────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-6xl mx-auto px-6 w-full">

        {/* Badge */}
        <div
          className="animate-fade-in inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass border border-forsythia/20"
          style={{ animationDelay: '0ms' }}
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-forsythia opacity-70 animate-pulse-ring" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-forsythia" />
          </span>
          <WaveBars />
          <span className="text-[11px] font-mono font-semibold text-forsythia tracking-[0.18em] uppercase">
            AI Platform · v2.0 Now Live
          </span>
        </div>

        {/* Headline — word-by-word stagger via CSS */}
        <h1
          className="font-mono font-extrabold leading-[1.04] tracking-tight text-balance"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)' }}
        >
          <span
            className="block text-arctic animate-fade-up"
            style={{ animationDelay: '60ms' }}
          >
            Build the
          </span>
          <span
            className="block shimmer-text animate-fade-up"
            style={{ animationDelay: '130ms' }}
          >
            Intelligence Layer
          </span>
          <span
            className="block text-arctic animate-fade-up"
            style={{ animationDelay: '200ms' }}
          >
            of Your Product
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mt-7 text-lg md:text-xl max-w-2xl font-sans font-normal leading-relaxed text-[rgba(241,246,244,0.58)] animate-blur-in"
          style={{ animationDelay: '280ms' }}
        >
          NeuralOS gives enterprise teams one platform to train, deploy and
          monitor AI agents — with zero infrastructure complexity.
        </p>

        {/* CTA row */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: '360ms' }}
        >
          {/* Primary CTA */}
          <a
            ref={ctaRef}
            href="#pricing"
            className="magnetic group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-[15px] font-semibold font-sans text-dark bg-forsythia shadow-gold overflow-hidden"
            style={{ transition: 'background-color 175ms ease-out, box-shadow 175ms ease-out' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FFD740')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFC801')}
          >
            {/* Shimmer sweep */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] bg-white/20"
              style={{ transition: 'transform 550ms ease-out' }}
            />
            <CubeIcon size={18} color="#0A1628" />
            Start Building Free
            <span
              className="inline-block"
              style={{ transition: 'transform 175ms ease-out' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}
            >→</span>
          </a>

          {/* Secondary CTA */}
          <a
            ref={demoRef}
            href="#features"
            className="magnetic group inline-flex items-center gap-3 px-8 py-4 rounded-xl text-[15px] font-semibold font-sans text-arctic glass-dark border border-[rgba(241,246,244,0.10)]"
            style={{ transition: 'border-color 175ms ease-out, background 175ms ease-out' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,200,1,0.32)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(241,246,244,0.10)')}
          >
            Watch Demo
            <span
              className="w-7 h-7 rounded-full border border-[rgba(241,246,244,0.25)] flex items-center justify-center text-xs"
              style={{ transition: 'border-color 175ms ease-out, color 175ms ease-out' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,200,1,0.6)'; e.currentTarget.style.color='#FFC801' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(241,246,244,0.25)'; e.currentTarget.style.color='inherit' }}
            >▶</span>
          </a>
        </div>

        {/* Trust indicators */}
        <p
          className="mt-5 text-xs text-[rgba(241,246,244,0.32)] font-mono tracking-wide animate-fade-in"
          style={{ animationDelay: '480ms' }}
        >
          No credit card required · 14-day free trial · SOC 2 Type II
        </p>

        {/* Logo strip */}
        <div
          className="mt-14 animate-fade-in w-full"
          style={{ animationDelay: '560ms' }}
        >
          <p className="text-[10px] font-mono font-medium text-[rgba(241,246,244,0.28)] tracking-[0.2em] uppercase mb-5">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {LOGOS.map(name => (
              <span
                key={name}
                className="text-sm font-mono font-medium text-[rgba(241,246,244,0.25)] hover:text-[rgba(241,246,244,0.55)] transition-colors duration-175"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating stat cards ────────────────────────────────── */}
      <FloatCard
        className="hidden lg:block left-[5%] top-[38%] w-52"
        style={{ animationDuration: '5.2s', animationDelay: '0.4s' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <ArrowTrendingUpIcon size={15} color="#FFC801" />
          <span className="text-[10px] text-[rgba(241,246,244,0.45)] font-mono uppercase tracking-wider">Revenue Growth</span>
        </div>
        <div className="text-2xl font-mono font-bold text-forsythia">+247%</div>
        <Sparkline values={[30, 45, 38, 60, 55, 80, 75, 100]} />
        <div className="text-[10px] text-[rgba(241,246,244,0.35)] mt-1 font-mono">vs last quarter</div>
      </FloatCard>

      <FloatCard
        className="hidden lg:block right-[4%] top-[30%] w-56"
        style={{ animationDuration: '4.8s', animationDelay: '1.2s' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <ChartPieIcon size={15} color="#FFC801" />
          <span className="text-[10px] text-[rgba(241,246,244,0.45)] font-mono uppercase tracking-wider">Accuracy Score</span>
        </div>
        <div className="text-2xl font-mono font-bold text-arctic mb-2">99.4%</div>
        <div className="flex gap-1">
          {[1,1,1,1,0.3].map((o, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: `rgba(255,200,1,${o})` }} />
          ))}
        </div>
        <div className="text-[10px] text-[rgba(241,246,244,0.35)] mt-2 font-mono">↑ 2.1% from last month</div>
      </FloatCard>

      <FloatCard
        className="hidden xl:block left-[13%] bottom-[18%] w-48"
        style={{ animationDuration: '6.2s', animationDelay: '0s' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[rgba(241,246,244,0.45)] font-mono uppercase tracking-wider">Active Agents</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="text-xl font-mono font-bold" style={{ color: '#3BBFDA' }}>12,483</div>
        <div className="w-full h-px bg-[rgba(255,200,1,0.12)] my-2" />
        <div className="text-[10px] text-forsythia font-mono">↑ 18 new this hour</div>
      </FloatCard>

      <FloatCard
        className="hidden xl:block right-[12%] bottom-[22%] w-48"
        style={{ animationDuration: '5.8s', animationDelay: '2s' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <LinkSolidIcon size={13} color="#FFC801" />
          <span className="text-[10px] text-[rgba(241,246,244,0.45)] font-mono uppercase tracking-wider">Integrations</span>
        </div>
        <div className="text-2xl font-mono font-bold text-arctic">200+</div>
        <div className="text-[10px] text-[rgba(241,246,244,0.35)] mt-1 font-mono">APIs connected</div>
      </FloatCard>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
        style={{ animationDelay: '700ms' }}
        aria-hidden="true"
      >
        <span className="text-[9px] text-[rgba(241,246,244,0.28)] font-mono tracking-[0.25em] uppercase">Scroll</span>
        <div className="relative w-5 h-8 rounded-full border border-[rgba(241,246,244,0.15)] flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-1.5 rounded-full bg-forsythia"
            style={{ animation: 'float 1.8s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
