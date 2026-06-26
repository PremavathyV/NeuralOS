'use client'

import { useScrollObserver } from '@/hooks/useScrollObserver'

const BRANDS = [
  { name: 'Anthropic',     symbol: 'A' },
  { name: 'OpenAI',        symbol: 'O' },
  { name: 'Mistral AI',    symbol: 'M' },
  { name: 'Cohere',        symbol: 'C' },
  { name: 'Hugging Face',  symbol: '🤗' },
  { name: 'Replicate',     symbol: 'R' },
  { name: 'Together AI',   symbol: 'T' },
  { name: 'Perplexity',    symbol: 'P' },
  { name: 'Scale AI',      symbol: 'S' },
  { name: 'Weights & Biases', symbol: 'W' },
]

function Brand({ name, symbol }: { name: string; symbol: string }) {
  return (
    <div
      className="flex items-center gap-3 px-7 py-3.5 rounded-xl glass-dark border border-[rgba(241,246,244,0.05)] shrink-0 cursor-default select-none"
      style={{ transition: 'border-color 175ms ease-out, opacity 175ms ease-out' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,200,1,0.18)'; (e.currentTarget as HTMLElement).style.opacity = '1' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(241,246,244,0.05)'; (e.currentTarget as HTMLElement).style.opacity = '' }}
    >
      <span className="text-base">{symbol}</span>
      <span className="font-mono font-semibold text-sm text-[rgba(241,246,244,0.38)] whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

export default function TrustedBy() {
  const ref = useScrollObserver<HTMLDivElement>()

  return (
    <section id="trusted" aria-label="Trusted by" className="relative py-20 overflow-hidden">
      {/* Top separator */}
      <div className="section-sep mb-16" />

      <div ref={ref} className="observe-fade text-center mb-10 px-6">
        <p className="text-[11px] font-mono font-medium text-[rgba(241,246,244,0.32)] tracking-[0.22em] uppercase">
          Trusted by teams at the world&apos;s leading AI companies
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden" aria-hidden="true">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A1628, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A1628, transparent)' }} />

        {/* Track (doubled) */}
        <div className="flex gap-4 animate-marquee w-max">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <Brand key={`${b.name}-${i}`} name={b.name} symbol={b.symbol} />
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="section-sep mt-16" />
    </section>
  )
}
