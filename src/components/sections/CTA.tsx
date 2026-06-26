'use client'

import { useScrollObserver } from '@/hooks/useScrollObserver'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { CubeIcon, ArrowTrendingUpIcon } from '@/components/icons'

export default function CTA() {
  const ref    = useScrollObserver<HTMLDivElement>()
  const ctaRef = useMagneticButton<HTMLAnchorElement>(0.28)

  return (
    <section
      id="cta"
      aria-label="Call to action"
      className="relative py-32 overflow-hidden"
    >
      {/* Animated background */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full animate-pulse-glow"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(255,200,1,0.09) 0%, rgba(17,76,90,0.06) 40%, transparent 65%)',
          }}
        />
      </div>

      <div className="section-sep mb-24" />

      <div ref={ref} className="observe-blur max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-forsythia/20 mb-8">
          <ArrowTrendingUpIcon size={14} color="#FFC801" />
          <span className="text-[11px] font-mono font-semibold text-forsythia tracking-[0.18em] uppercase">
            Join 3,000+ AI teams today
          </span>
        </div>

        <h2
          className="font-mono font-extrabold tracking-tight leading-tight mb-6 text-balance"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}
        >
          <span className="text-arctic">Ready to build the</span>
          <br />
          <span className="shimmer-text">future with AI?</span>
        </h2>

        <p className="text-lg md:text-xl text-[rgba(241,246,244,0.52)] max-w-xl mx-auto font-sans mb-10">
          Start free in 60 seconds. No credit card. No infrastructure setup.
          Just pure AI velocity.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            ref={ctaRef}
            href="#pricing"
            className="magnetic group relative inline-flex items-center gap-2.5 px-10 py-4.5 rounded-xl text-base font-semibold font-sans text-dark bg-forsythia shadow-gold overflow-hidden"
            style={{ padding: '18px 40px', transition: 'background-color 175ms ease-out, box-shadow 175ms ease-out' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FFD740')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FFC801')}
          >
            <span aria-hidden="true"
              className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-[200%] bg-white/20"
              style={{ transition: 'transform 550ms ease-out' }} />
            <CubeIcon size={18} color="#0A1628" />
            Start Building Free
          </a>

          <a
            href="#features"
            className="inline-flex items-center gap-2 text-sm font-medium text-[rgba(241,246,244,0.58)]"
            style={{ transition: 'color 175ms ease-out' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F1F6F4')}
            onMouseLeave={e => (e.currentTarget.style.color = '')}
          >
            Explore all features →
          </a>
        </div>

        <p className="mt-5 text-xs text-[rgba(241,246,244,0.28)] font-mono">
          14-day trial · SOC 2 certified · Cancel anytime
        </p>
      </div>

      <div className="section-sep mt-24" />
    </section>
  )
}
