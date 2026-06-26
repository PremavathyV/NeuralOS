'use client'

import { useEffect, useRef } from 'react'
import {
  CubeIcon, CogIcon, ArrowPathIcon, ChartPieIcon, ArrowTrendingUpIcon,
} from '@/components/icons'

const STEPS = [
  {
    step:        '01',
    icon:        <CubeIcon size={22} color="#FFC801" />,
    title:       'Connect your data',
    description: 'Plug in your databases, APIs, documents and SaaS tools using our 200+ pre-built connectors or REST webhooks.',
  },
  {
    step:        '02',
    icon:        <CogIcon size={22} color="#FFC801" />,
    title:       'Build AI agents',
    description: 'Use the visual agent builder to define goals, tools, memory and escalation paths. No ML expertise required.',
  },
  {
    step:        '03',
    icon:        <ArrowPathIcon size={22} color="#FFC801" />,
    title:       'Test & fine-tune',
    description: 'Run automated evals, compare model outputs, and fine-tune on your proprietary data to maximize accuracy.',
  },
  {
    step:        '04',
    icon:        <ChartPieIcon size={22} color="#FFC801" />,
    title:       'Deploy to production',
    description: 'One-click deploy to our global edge network. Auto-scaling handles traffic spikes with zero downtime.',
  },
  {
    step:        '05',
    icon:        <ArrowTrendingUpIcon size={22} color="#FFC801" />,
    title:       'Monitor & optimize',
    description: 'Real-time dashboards surface latency, cost, accuracy and drift. Get AI-generated suggestions to cut spend.',
  },
]

/** Attaches IO observer to a container; adds 'visible' to each .step-item child with stagger */
function useStepObserver(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const items = container.querySelectorAll<HTMLElement>('.step-item')

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    items.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [containerRef])
}

export default function Workflow() {
  const headRef    = useRef<HTMLDivElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const mobileRef  = useRef<HTMLDivElement>(null)

  useStepObserver(desktopRef as React.RefObject<HTMLElement>)
  useStepObserver(mobileRef  as React.RefObject<HTMLElement>)

  // head observer
  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
    }, { threshold: 0.12 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="workflow" aria-label="How it works" className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255,200,1,0.05) 0%, transparent 65%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headRef} className="observe-fade text-center mb-20">
          <p className="text-xs font-mono font-medium text-forsythia tracking-[0.2em] uppercase mb-4">How It Works</p>
          <h2 className="font-mono font-extrabold text-4xl md:text-5xl lg:text-6xl text-arctic tracking-tight leading-tight">
            From idea to
            <span className="shimmer-text"> production</span>
            <br />
            in five steps.
          </h2>
        </div>

        {/* Desktop timeline */}
        <div ref={desktopRef} className="hidden md:block relative">
          <div className="absolute left-[39px] top-12 bottom-12 w-px bg-gradient-to-b from-forsythia/40 via-[rgba(17,76,90,0.6)] to-forsythia/10 pointer-events-none" />

          <div className="flex flex-col gap-0">
            {STEPS.map((s, i) => (
              <div
                key={s.step}
                className="step-item observe-fade group flex gap-10 py-8"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10 shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-[rgba(10,22,40,0.9)] border border-[rgba(255,200,1,0.2)] flex flex-col items-center justify-center gap-1
                    group-hover:border-forsythia/50 group-hover:bg-[rgba(255,200,1,0.05)] transition-all duration-200">
                    {s.icon}
                    <span className="text-[10px] font-mono font-bold text-forsythia tracking-widest">{s.step}</span>
                  </div>
                </div>

                <div className="pt-3 pb-2">
                  <h3 className="font-mono font-bold text-xl text-arctic mb-3 group-hover:text-forsythia transition-colors duration-150">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[rgba(241,246,244,0.55)] font-sans leading-relaxed max-w-xl">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        <div ref={mobileRef} className="md:hidden flex flex-col gap-4">
          {STEPS.map((s, i) => (
            <div
              key={s.step}
              className="step-item observe-fade glass gradient-border rounded-2xl p-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(255,200,1,0.1)] border border-[rgba(255,200,1,0.2)] flex items-center justify-center">
                  {s.icon}
                </div>
                <span className="text-xs font-mono font-bold text-forsythia tracking-widest">{s.step}</span>
              </div>
              <h3 className="font-mono font-semibold text-base text-arctic mb-2">{s.title}</h3>
              <p className="text-sm text-[rgba(241,246,244,0.55)] font-sans leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
