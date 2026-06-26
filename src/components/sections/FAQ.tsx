'use client'

import { useState, useRef, useEffect } from 'react'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { ChevronDownIcon } from '@/components/icons'

const FAQS = [
  {
    q: 'What models does NeuralOS support?',
    a: 'NeuralOS supports 40+ models including GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Mistral Large, Llama 3.1 405B and every major open-source model via Hugging Face. We add new models within 48 hours of general availability.',
  },
  {
    q: 'How does the 20% annual discount work?',
    a: 'When you switch to annual billing, we apply a flat 20% discount to your monthly rate across all plans. The discounted per-month price is shown live in the pricing section. You are charged the full annual amount upfront and can switch back to monthly at your next renewal.',
  },
  {
    q: 'Is my data used to train models?',
    a: 'No. Your data is never used to train or improve any models — ours or anyone else\'s. All inference data is encrypted in transit and at rest. Zero-data-retention mode ensures no request/response data is logged on our infrastructure.',
  },
  {
    q: 'What compliance certifications do you hold?',
    a: 'NeuralOS is SOC 2 Type II certified and HIPAA-ready on the Enterprise plan. We support GDPR data residency with EU-hosted infrastructure. Security whitepapers and audit reports are available on request.',
  },
  {
    q: 'Can I bring my own model or fine-tune on proprietary data?',
    a: 'Absolutely. The Fine-tuning Studio on Pro and Enterprise lets you upload a JSONL dataset and fine-tune any supported base model. You own the resulting weights. You can also bring an externally-hosted model and route traffic through our inference gateway.',
  },
  {
    q: 'How does pricing scale beyond plan limits?',
    a: 'Usage beyond your monthly token allocation is billed at per-token overage rates visible in your dashboard in real time. Enterprise customers can negotiate committed-use discounts. We never cut off your service.',
  },
  {
    q: 'What is your uptime SLA?',
    a: 'Starter plans receive 99.5% monthly uptime. Pro plans receive 99.9%. Enterprise customers receive a custom SLA up to 99.99%, backed by financial credits. Status history is public at status.neuralos.ai.',
  },
]

function AccordionItem({
  item,
  open,
  onToggle,
  index,
}: {
  item: (typeof FAQS)[0]
  open: boolean
  onToggle: () => void
  index: number
}) {
  const ref = useScrollObserver<HTMLDivElement>()
  const bodyRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | string>(0)

  useEffect(() => {
    if (open && bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight)
    } else {
      setHeight(0)
    }
  }, [open])

  return (
    <div ref={ref} className={`observe-fade delay-${(index % 4) * 75}`}>
      <div
        className="glass-dark rounded-2xl overflow-hidden border"
        style={{
          borderColor: open ? 'rgba(255,200,1,0.22)' : 'rgba(241,246,244,0.06)',
          transition: 'border-color 250ms ease',
        }}
      >
        <button
          className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-forsythia/50"
          onClick={onToggle}
          aria-expanded={open}
        >
          <span
            className="font-mono font-semibold text-sm pr-4 leading-snug"
            style={{ color: open ? '#FFC801' : '#F1F6F4', transition: 'color 175ms ease-out' }}
          >
            {item.q}
          </span>
          <span
            className="shrink-0"
            style={{
              display: 'inline-flex',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <ChevronDownIcon size={18} color={open ? '#FFC801' : 'rgba(241,246,244,0.45)'} />
          </span>
        </button>

        <div
          className="overflow-hidden transition-all duration-380 ease-expo-out"
          style={{ maxHeight: height !== 'auto' ? `${height}px` : 'none' }}
        >
          <div ref={bodyRef} className="px-6 pb-6">
            <div className="h-px bg-[rgba(241,246,244,0.06)] mb-4" />
            <p className="text-sm text-[rgba(241,246,244,0.58)] font-sans leading-relaxed">
              {item.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const headRef = useScrollObserver<HTMLDivElement>()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" aria-label="Frequently asked questions" className="relative py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div ref={headRef} className="observe-blur text-center mb-14">
          <p className="text-[11px] font-mono font-semibold text-forsythia tracking-[0.22em] uppercase mb-5">
            FAQ
          </p>
          <h2
            className="font-mono font-extrabold text-arctic tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)' }}
          >
            Questions answered.
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <AccordionItem
              key={item.q}
              item={item}
              open={open === i}
              onToggle={() => setOpen(p => p === i ? null : i)}
              index={i}
            />
          ))}
        </div>

        <div className="observe-fade mt-12 text-center">
          <p className="text-sm text-[rgba(241,246,244,0.42)] font-sans">
            Still have questions?{' '}
            <a href="#contact"
              className="text-forsythia font-medium"
              style={{ transition: 'opacity 175ms' }}
              onMouseEnter={e => (e.currentTarget.style.opacity='0.75')}
              onMouseLeave={e => (e.currentTarget.style.opacity='1')}
            >
              Talk to our team →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
