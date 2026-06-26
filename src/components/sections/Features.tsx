'use client'

import { useState } from 'react'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import {
  CogIcon, ChartPieIcon, ArrowTrendingUpIcon,
  CubeIcon, LinkSolidIcon, ArrowPathIcon,
} from '@/components/icons'
import { cn } from '@/utils/cn'

interface Feature {
  icon:        React.ReactNode
  title:       string
  description: string
  tag:         string
  metric?:     string
  metricLabel?: string
}

const FEATURES: Feature[] = [
  {
    icon:        <CubeIcon size={22} color="#FFC801" />,
    title:       'Intelligent Agent Builder',
    description: 'Compose multi-step AI agents with visual workflows, conditional branching, memory and tool-use — no ML expertise required.',
    tag:         'Core',
    metric:      '10×',
    metricLabel: 'faster than coding by hand',
  },
  {
    icon:        <ChartPieIcon size={22} color="#FFC801" />,
    title:       'Real-time Analytics',
    description: 'Token-level tracing, cost attribution, accuracy tracking and anomaly alerts — all live in a single dashboard.',
    tag:         'Observability',
    metric:      '99.9%',
    metricLabel: 'uptime SLA',
  },
  {
    icon:        <ArrowTrendingUpIcon size={22} color="#FFC801" />,
    title:       'Auto-scaling Inference',
    description: 'Elastic GPU clusters spin up in under 90 seconds. Pay only per millisecond of actual compute — no idle waste.',
    tag:         'Infrastructure',
    metric:      '<50ms',
    metricLabel: 'p99 latency',
  },
  {
    icon:        <LinkSolidIcon size={22} color="#FFC801" />,
    title:       'Universal Connectors',
    description: 'Pre-built integrations with 200+ APIs, databases and SaaS tools. REST, GraphQL and webhooks out of the box.',
    tag:         'Integrations',
    metric:      '200+',
    metricLabel: 'connectors ready',
  },
  {
    icon:        <CogIcon size={22} color="#FFC801" />,
    title:       'Fine-tuning Studio',
    description: 'Upload a JSONL dataset, choose a base model and launch fine-tuning in one click. LoRA, QLoRA and full fine-tune supported.',
    tag:         'Models',
    metric:      '40+',
    metricLabel: 'base models',
  },
  {
    icon:        <ArrowPathIcon size={22} color="#FFC801" />,
    title:       'Continuous Retraining',
    description: 'Drift detection triggers automated retraining pipelines. Your models stay accurate without manual intervention.',
    tag:         'Automation',
    metric:      '100%',
    metricLabel: 'automated',
  },
]

function FeatureCard({ feat, index }: { feat: Feature; index: number }) {
  const ref = useScrollObserver<HTMLDivElement>()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className={`observe-fade delay-${(index % 3) * 100 + 100} group relative glass gradient-border rounded-3xl p-7 flex flex-col overflow-hidden cursor-default`}
      style={{
        transition: 'transform 175ms ease-out, box-shadow 175ms ease-out',
        transform: hovered ? 'translateY(-5px) scale(1.01)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? '0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,200,1,0.14)' : '',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Radial glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 40% 20%, rgba(255,200,1,0.07) 0%, transparent 65%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 175ms ease-out',
        }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0"
        style={{
          background: hovered ? 'rgba(255,200,1,0.15)' : 'rgba(255,200,1,0.08)',
          border: hovered ? '1px solid rgba(255,200,1,0.35)' : '1px solid rgba(255,200,1,0.14)',
          transition: 'background 175ms ease-out, border-color 175ms ease-out',
        }}
      >
        {feat.icon}
      </div>

      {/* Tag */}
      <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-[0.14em] uppercase text-forsythia bg-[rgba(255,200,1,0.08)] border border-[rgba(255,200,1,0.14)]">
        {feat.tag}
      </span>

      <h3 className="text-[17px] font-mono font-bold text-arctic mb-3 tracking-tight leading-snug">
        {feat.title}
      </h3>
      <p className="text-sm text-[rgba(241,246,244,0.52)] font-sans leading-relaxed flex-1">
        {feat.description}
      </p>

      {/* Metric */}
      {feat.metric && (
        <div className="mt-5 pt-4 border-t border-[rgba(241,246,244,0.07)] flex items-baseline gap-2">
          <span className="font-mono font-extrabold text-xl text-forsythia">{feat.metric}</span>
          <span className="text-xs text-[rgba(241,246,244,0.38)] font-sans">{feat.metricLabel}</span>
        </div>
      )}

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,200,1,0.45), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 175ms ease-out',
        }}
      />
    </div>
  )
}

export default function Features() {
  const headRef = useScrollObserver<HTMLDivElement>()

  return (
    <section id="features" aria-label="Features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(17,76,90,0.12) 0%, transparent 65%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headRef} className="observe-blur text-center mb-20">
          <p className="text-[11px] font-mono font-semibold text-forsythia tracking-[0.22em] uppercase mb-5">
            Platform Features
          </p>
          <h2
            className="font-mono font-extrabold tracking-tight leading-tight text-balance"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            <span className="text-arctic">Everything your AI stack</span>
            <br />
            <span className="shimmer-text">needs to scale.</span>
          </h2>
          <p className="mt-6 text-lg text-[rgba(241,246,244,0.52)] max-w-2xl mx-auto font-sans">
            One platform for the full AI lifecycle — from prototyping to production,
            observability to governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feat={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
