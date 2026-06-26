'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import {
  CubeIcon, ChartPieIcon, ArrowPathIcon,
  LinkSolidIcon, CogIcon, ArrowTrendingUpIcon, ChevronDownIcon,
} from '@/components/icons'
import { cn } from '@/utils/cn'

interface BentoItem {
  id:          number
  title:       string
  description: string
  icon:        React.ReactNode
  span:        string  // Tailwind col/row span
  accent:      string
  badge?:      string
  stat?:       { value: string; label: string }
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: 0,
    title:       'Neural Inference Engine',
    description: 'Sub-50ms latency across GPT-4, Claude 3, Gemini Ultra and 40+ open-source models. Route requests intelligently by cost, speed and capability.',
    icon:        <CubeIcon size={24} color="#FFC801" />,
    span:        'col-span-1 md:col-span-2 row-span-2',
    accent:      'from-[rgba(255,200,1,0.12)] to-transparent',
    badge:       '50ms p99',
    stat:        { value: '40+', label: 'Models Supported' },
  },
  {
    id: 1,
    title:       'Live Analytics',
    description: 'Token-level tracing, cost attribution and anomaly alerts — all in real time.',
    icon:        <ChartPieIcon size={22} color="#FFC801" />,
    span:        'col-span-1 row-span-1',
    accent:      'from-[rgba(17,76,90,0.3)] to-transparent',
    badge:       'Real-time',
    stat:        { value: '99.9%', label: 'Uptime SLA' },
  },
  {
    id: 2,
    title:       'Smart Retries',
    description: 'Automatic fallback routing and retry logic when any provider goes down.',
    icon:        <ArrowPathIcon size={22} color="#FFC801" />,
    span:        'col-span-1 row-span-1',
    accent:      'from-[rgba(245,166,35,0.1)] to-transparent',
    badge:       'Auto-heal',
  },
  {
    id: 3,
    title:       '200+ Integrations',
    description: 'Connect to Slack, Notion, Salesforce, Postgres, S3 and more without writing glue code.',
    icon:        <LinkSolidIcon size={22} color="#FFC801" />,
    span:        'col-span-1 md:col-span-2 row-span-1',
    accent:      'from-[rgba(17,76,90,0.2)] to-transparent',
    badge:       'Connectors',
    stat:        { value: '200+', label: 'Native Integrations' },
  },
  {
    id: 4,
    title:       'Fine-Tuning Pipeline',
    description: 'Upload a JSONL dataset, pick a base model and launch training. RLHF, LoRA and QLoRA included.',
    icon:        <CogIcon size={22} color="#FFC801" />,
    span:        'col-span-1 row-span-1',
    accent:      'from-[rgba(255,200,1,0.08)] to-transparent',
    badge:       'Studio',
  },
  {
    id: 5,
    title:       'Revenue Analytics',
    description: 'Attribute AI costs to teams, products and features. Optimize spend with automated suggestions.',
    icon:        <ArrowTrendingUpIcon size={22} color="#FFC801" />,
    span:        'col-span-1 row-span-1',
    accent:      'from-[rgba(245,166,35,0.12)] to-transparent',
    badge:       'FinOps',
    stat:        { value: '40%', label: 'Avg Cost Reduction' },
  },
]

/* Desktop bento card */
function BentoCard({ item, active, onHover }: { item: BentoItem; active: boolean; onHover: (id: number | null) => void }) {
  return (
    <div
      className={cn(
        item.span,
        'relative group glass gradient-border rounded-3xl p-7 overflow-hidden cursor-default',
        'transition-all duration-200 hover:scale-[1.015]',
        active && 'scale-[1.015]'
      )}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Gradient bg */}
      <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80 pointer-events-none', item.accent)} />

      {/* Hover glow */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,200,1,0.07) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-[rgba(255,200,1,0.1)] border border-[rgba(255,200,1,0.2)] flex items-center justify-center
            group-hover:bg-[rgba(255,200,1,0.18)] group-hover:border-forsythia/40 transition-all duration-200">
            {item.icon}
          </div>
          {item.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-widest uppercase text-forsythia bg-[rgba(255,200,1,0.1)] border border-[rgba(255,200,1,0.2)]">
              {item.badge}
            </span>
          )}
        </div>

        <h3 className="font-mono font-bold text-xl text-arctic mb-3 tracking-tight leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-[rgba(241,246,244,0.55)] font-sans leading-relaxed flex-1">
          {item.description}
        </p>

        {item.stat && (
          <div className="mt-5 pt-4 border-t border-[rgba(241,246,244,0.07)]">
            <span className="block font-mono font-extrabold text-2xl text-forsythia">{item.stat.value}</span>
            <span className="text-xs text-[rgba(241,246,244,0.4)] font-sans">{item.stat.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* Mobile accordion item */
function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: BentoItem
  open: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | string>(0)

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [open])

  return (
    <div className="glass-dark gradient-border rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-forsythia/50"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[rgba(255,200,1,0.1)] border border-[rgba(255,200,1,0.15)] flex items-center justify-center shrink-0">
            {item.icon}
          </div>
          <span className="font-mono font-semibold text-sm text-arctic">{item.title}</span>
        </div>
        <ChevronDownIcon
          size={18}
          color="#FFC801"
          className={cn('shrink-0 transition-transform duration-300', open && 'rotate-180')}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-350 ease-expo-out"
        style={{ maxHeight: height !== 'auto' ? `${height}px` : 'none' }}
      >
        <div ref={contentRef} className="px-5 pb-5">
          <p className="text-sm text-[rgba(241,246,244,0.55)] font-sans leading-relaxed">
            {item.description}
          </p>
          {item.stat && (
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono font-bold text-xl text-forsythia">{item.stat.value}</span>
              <span className="text-xs text-[rgba(241,246,244,0.4)]">{item.stat.label}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BentoGrid() {
  const headRef        = useScrollObserver<HTMLDivElement>()
  const gridRef        = useScrollObserver<HTMLDivElement>()
  const [activeIdx, setActiveIdx] = useState<number>(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggle = useCallback((i: number) => {
    setActiveIdx(prev => (prev === i ? -1 : i))
  }, [])

  return (
    <section id="bento" aria-label="Platform overview" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 60%, rgba(17,76,90,0.18) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headRef} className="observe-fade text-center mb-20">
          <p className="text-xs font-mono font-medium text-forsythia tracking-[0.2em] uppercase mb-4">Platform</p>
          <h2 className="font-mono font-extrabold text-4xl md:text-5xl lg:text-6xl text-arctic leading-tight tracking-tight">
            One platform.
            <br />
            <span className="shimmer-text">Infinite possibilities.</span>
          </h2>
        </div>

        {/* Desktop grid */}
        {!isMobile ? (
          <div
            ref={gridRef}
            className="observe-fade hidden md:grid grid-cols-3 auto-rows-fr gap-5"
          >
            {BENTO_ITEMS.map((item) => (
              <BentoCard
                key={item.id}
                item={item}
                active={activeIdx === item.id}
                onHover={(id) => id !== null && setActiveIdx(id)}
              />
            ))}
          </div>
        ) : (
          /* Mobile accordion */
          <div className="flex flex-col gap-3 md:hidden">
            {BENTO_ITEMS.map((item, i) => (
              <AccordionItem
                key={item.id}
                item={item}
                open={activeIdx === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
