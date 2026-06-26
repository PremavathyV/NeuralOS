'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { cn } from '@/utils/cn'

const TESTIMONIALS = [
  {
    name: 'Aditya Sharma', role: 'Head of AI Engineering', company: 'Flipkart',
    review: 'NeuralOS cut our model deployment time from 3 weeks to under a day. The fine-tuning studio is genuinely incredible — we ran 6 experiments in a single sprint that previously would have taken quarters.',
    rating: 5, initials: 'AS', color: '#FFC801',
  },
  {
    name: 'Sarah Chen', role: 'CTO', company: 'Synthesis Health',
    review: 'We process 40 million patient interactions per month. NeuralOS gives us latency, compliance and observability in one place. Their HIPAA-ready infrastructure saved us 8 months of work.',
    rating: 5, initials: 'SC', color: '#114C5A',
  },
  {
    name: 'Marcus Webb', role: 'VP Product', company: 'Axiom Capital',
    review: "The FinOps dashboard alone paid for our subscription in the first week. We were burning $60k/month on inference — NeuralOS helped us cut that by 43% without sacrificing quality.",
    rating: 5, initials: 'MW', color: '#F5A623',
  },
  {
    name: 'Priya Nair', role: 'ML Platform Lead', company: 'Swiggy',
    review: 'Built our entire recommendation AI on NeuralOS in 6 weeks. The agent builder abstracts away so much boilerplate. Latency went from 200ms to 38ms p99.',
    rating: 5, initials: 'PN', color: '#FFC801',
  },
  {
    name: 'Lucas Ferreira', role: 'Founder', company: 'VeloAI',
    review: "As a solo founder, NeuralOS is my entire AI infrastructure team. The DX is unmatched — I went from idea to production in a weekend. The Starter plan is outrageously good value.",
    rating: 5, initials: 'LF', color: '#114C5A',
  },
]

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < n ? '#FFC801' : 'rgba(241,246,244,0.18)', fontSize: 14 }}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const headRef  = useScrollObserver<HTMLDivElement>()
  const [idx, setIdx] = useState(0)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [dragging, setDragging] = useState(false)
  const [startX,   setStartX]   = useState(0)
  const count = TESTIMONIALS.length

  const go = useCallback((dir: 1 | -1) => setIdx(p => (p + dir + count) % count), [count])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => go(1), 5500)
  }, [go])

  useEffect(() => { resetAuto(); return () => { if (autoRef.current) clearInterval(autoRef.current) } }, [resetAuto])

  const prev = () => { go(-1); resetAuto() }
  const next = () => { go(1);  resetAuto() }

  return (
    <section id="testimonials" aria-label="Testimonials" className="relative py-32 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(17,76,90,0.13) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={headRef} className="observe-fade text-center mb-16">
          <p className="text-[11px] font-mono font-semibold text-forsythia tracking-[0.22em] uppercase mb-5">
            Testimonials
          </p>
          <h2
            className="font-mono font-extrabold tracking-tight text-balance"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            <span className="text-arctic">Loved by AI teams</span>
            <br />
            <span className="shimmer-text">worldwide.</span>
          </h2>
        </div>

        {/* Slider */}
        <div className="relative max-w-3xl mx-auto">
          <div
            className="overflow-hidden rounded-3xl"
            onTouchStart={e => { setStartX(e.touches[0].clientX); setDragging(true) }}
            onTouchEnd={e => {
              if (!dragging) return
              const dx = e.changedTouches[0].clientX - startX
              if (Math.abs(dx) > 50) { dx < 0 ? next() : prev() }
              setDragging(false)
            }}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${idx * (100 / count)}%)`,
                transition: 'transform 420ms cubic-bezier(0.16,1,0.3,1)',
                width: `${count * 100}%`,
              }}
            >
              {TESTIMONIALS.map(t => (
                <div key={t.name} style={{ width: `${100 / count}%` }} className="px-2">
                  <article className="glass gradient-border rounded-3xl p-8 md:p-10">
                    <Stars n={t.rating} />
                    <blockquote className="mt-5 text-base md:text-[17px] text-[rgba(241,246,244,0.78)] font-sans leading-relaxed italic">
                      &ldquo;{t.review}&rdquo;
                    </blockquote>
                    <div className="mt-8 flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-sm shrink-0 border-2"
                        style={{ background: `${t.color}1A`, borderColor: `${t.color}44`, color: t.color }}
                        aria-hidden="true"
                      >
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-mono font-semibold text-arctic text-sm">{t.name}</div>
                        <div className="text-xs text-[rgba(241,246,244,0.42)] font-sans">{t.role} · {t.company}</div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button onClick={prev} aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full glass-dark border border-[rgba(241,246,244,0.09)] flex items-center justify-center text-arctic"
              style={{ transition: 'border-color 175ms, color 175ms' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,200,1,0.35)'; (e.currentTarget as HTMLElement).style.color='#FFC801' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=''; (e.currentTarget as HTMLElement).style.color='' }}
            >
              <ChevronLeftIcon size={16} color="currentColor" />
            </button>

            <div className="flex gap-2" role="group" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIdx(i); resetAuto() }}
                  aria-current={i === idx}
                  aria-label={`Testimonial ${i + 1}`}
                  className="rounded-full"
                  style={{
                    width: i === idx ? 24 : 8,
                    height: 8,
                    background: i === idx ? '#FFC801' : 'rgba(241,246,244,0.2)',
                    transition: 'width 300ms cubic-bezier(0.16,1,0.3,1), background 200ms',
                  }}
                />
              ))}
            </div>

            <button onClick={next} aria-label="Next testimonial"
              className="w-10 h-10 rounded-full glass-dark border border-[rgba(241,246,244,0.09)] flex items-center justify-center text-arctic"
              style={{ transition: 'border-color 175ms, color 175ms' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,200,1,0.35)'; (e.currentTarget as HTMLElement).style.color='#FFC801' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=''; (e.currentTarget as HTMLElement).style.color='' }}
            >
              <ChevronRightIcon size={16} color="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
