'use client'

import { useState, useCallback, useMemo, memo } from 'react'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { computePrice, type Currency, type Billing, type PlanKey } from '@/utils/pricing'
import { CubeIcon, ArrowTrendingUpIcon, CogIcon } from '@/components/icons'
import { cn } from '@/utils/cn'

/* ─── Static plan metadata ──────────────────────────────────── */
interface PlanMeta {
  key:         PlanKey
  name:        string
  icon:        React.ReactNode
  tagline:     string
  recommended: boolean
  features:    string[]
  cta:         string
}

const PLANS: PlanMeta[] = [
  {
    key: 'starter', name: 'Starter',
    icon: <CubeIcon size={20} color="#FFC801" />,
    tagline: 'Perfect for indie hackers and small teams exploring AI.',
    recommended: false,
    features: ['5M tokens / month', '10 AI agents', '3 team members', 'REST & GraphQL APIs', 'Email support', '99.5% SLA'],
    cta: 'Start Free Trial',
  },
  {
    key: 'pro', name: 'Pro',
    icon: <ArrowTrendingUpIcon size={20} color="#0A1628" />,
    tagline: 'For growing teams shipping real AI products at scale.',
    recommended: true,
    features: ['50M tokens / month', 'Unlimited agents', '25 team members', 'Fine-tuning studio', '200+ integrations', 'Priority support', '99.9% SLA'],
    cta: 'Get Started',
  },
  {
    key: 'enterprise', name: 'Enterprise',
    icon: <CogIcon size={20} color="#FFC801" />,
    tagline: 'Custom infra, dedicated SLAs, compliance & governance.',
    recommended: false,
    features: ['Unlimited tokens', 'Unlimited agents', 'Unlimited seats', 'Dedicated GPU clusters', 'SAML SSO & SCIM', 'Custom SLAs & contracts', 'Dedicated CSM', 'SOC 2 & HIPAA'],
    cta: 'Contact Sales',
  },
]

const CURRENCIES: Currency[]                  = ['USD', 'INR', 'EUR']
const CURRENCY_FLAGS: Record<Currency, string> = { USD: '🇺🇸', INR: '🇮🇳', EUR: '🇪🇺' }

/* ─── Isolated price display — only this re-renders on change ── */
const PriceDisplay = memo(function PriceDisplay({
  planKey, currency, billing, recommended,
}: { planKey: PlanKey; currency: Currency; billing: Billing; recommended: boolean }) {
  const price = useMemo(
    () => computePrice(planKey, currency, billing),
    [planKey, currency, billing]
  )
  const textMuted = recommended ? 'text-[rgba(10,22,40,0.55)]' : 'text-[rgba(241,246,244,0.42)]'
  const textMain  = recommended ? 'text-dark' : 'text-arctic'

  return (
    <div className="mt-6 mb-5">
      <div className="flex items-end gap-1.5">
        <span className={cn('font-mono font-extrabold tabular-nums tracking-tight', textMain)}
          style={{ fontSize: 'clamp(2.4rem,4vw,3rem)' }}>
          {price.displayPrice}
        </span>
        <span className={cn('text-sm font-mono pb-2', textMuted)}>/mo</span>
      </div>
      {billing === 'annual' && (
        <>
          <p className={cn('text-xs font-mono mt-1', textMuted)}>{price.displayAnnual}</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider text-nocturnal bg-forsythia">
            {price.savings}
          </span>
        </>
      )}
    </div>
  )
})

/* ─── Individual plan card ───────────────────────────────────── */
function PlanCard({ plan, currency, billing }: { plan: PlanMeta; currency: Currency; billing: Billing }) {
  const ref = useScrollObserver<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        'observe-fade relative rounded-3xl flex flex-col overflow-hidden',
        plan.recommended
          ? 'bg-forsythia'
          : 'glass gradient-border',
      )}
      style={{
        transition: 'transform 175ms ease-out, box-shadow 175ms ease-out',
        boxShadow: plan.recommended ? '0 0 60px rgba(255,200,1,0.28)' : '',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.02) translateY(-4px)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = '' }}
    >
      {/* Most popular badge */}
      {plan.recommended && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <span className="inline-block px-4 py-1 rounded-b-xl text-[11px] font-mono font-bold tracking-[0.14em] uppercase bg-nocturnal text-forsythia border border-b border-x border-forsythia/20">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8 flex flex-col flex-1 pt-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            plan.recommended ? 'bg-[rgba(10,22,40,0.14)]' : 'bg-[rgba(255,200,1,0.09)] border border-[rgba(255,200,1,0.18)]'
          )}>
            {plan.icon}
          </div>
          <h3 className={cn('font-mono font-bold text-xl tracking-tight', plan.recommended ? 'text-dark' : 'text-arctic')}>
            {plan.name}
          </h3>
        </div>
        <p className={cn('text-sm font-sans', plan.recommended ? 'text-[rgba(10,22,40,0.62)]' : 'text-[rgba(241,246,244,0.48)]')}>
          {plan.tagline}
        </p>

        {/* Dynamic price — isolated render */}
        <PriceDisplay planKey={plan.key} currency={currency} billing={billing} recommended={plan.recommended} />

        <div className={cn('h-px mb-6', plan.recommended ? 'bg-[rgba(10,22,40,0.1)]' : 'bg-[rgba(241,246,244,0.07)]')} />

        {/* Feature list */}
        <ul className="flex flex-col gap-3 flex-1">
          {plan.features.map(f => (
            <li key={f} className="flex items-start gap-2.5 text-sm font-sans">
              <span className={cn(
                'mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold',
                plan.recommended ? 'bg-[rgba(10,22,40,0.12)] text-dark' : 'bg-[rgba(255,200,1,0.12)] text-forsythia'
              )}>✓</span>
              <span className={plan.recommended ? 'text-[rgba(10,22,40,0.72)]' : 'text-[rgba(241,246,244,0.62)]'}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className={cn(
            'mt-8 w-full text-center py-3.5 rounded-xl font-semibold font-sans text-sm',
            plan.recommended
              ? 'bg-nocturnal text-arctic'
              : 'glass-dark border border-[rgba(255,200,1,0.18)] text-arctic',
          )}
          style={{ transition: 'background-color 175ms ease-out, border-color 175ms ease-out' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = plan.recommended ? '#1a6b7d' : 'rgba(255,200,1,0.06)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '' }}
        >
          {plan.cta}
        </a>
      </div>
    </div>
  )
}

/* ─── Main section ──────────────────────────────────────────── */
export default function Pricing() {
  const headRef = useScrollObserver<HTMLDivElement>()
  const [billing,  setBilling]  = useState<Billing>('monthly')
  const [currency, setCurrency] = useState<Currency>('USD')

  const handleBilling  = useCallback((b: Billing)  => setBilling(b),  [])
  const handleCurrency = useCallback((c: Currency) => setCurrency(c), [])

  return (
    <section id="pricing" aria-label="Pricing" className="relative py-32 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 85%, rgba(17,76,90,0.14) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headRef} className="observe-blur text-center mb-14">
          <p className="text-[11px] font-mono font-semibold text-forsythia tracking-[0.22em] uppercase mb-5">
            Pricing
          </p>
          <h2
            className="font-mono font-extrabold tracking-tight leading-tight text-balance"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            <span className="text-arctic">Simple, transparent</span>
            <br />
            <span className="shimmer-text">pricing.</span>
          </h2>
          <p className="mt-5 text-lg text-[rgba(241,246,244,0.52)] max-w-xl mx-auto font-sans">
            Start free. Scale with confidence. No surprise bills.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          {/* Billing */}
          <div
            className="flex items-center glass-dark rounded-xl p-1 border border-[rgba(241,246,244,0.07)]"
            role="group"
            aria-label="Billing period"
          >
            {(['monthly', 'annual'] as Billing[]).map(b => (
              <button
                key={b}
                onClick={() => handleBilling(b)}
                aria-pressed={billing === b}
                className={cn(
                  'px-5 py-2.5 rounded-lg text-sm font-mono font-medium',
                  billing === b
                    ? 'bg-forsythia text-dark shadow-gold-sm'
                    : 'text-[rgba(241,246,244,0.48)] hover:text-arctic',
                )}
                style={{ transition: 'background 250ms, color 175ms' }}
              >
                {b === 'monthly' ? 'Monthly' : (
                  <>Annual <span className="ml-1.5 text-[10px] font-bold bg-forsythia/20 text-forsythia rounded px-1.5 py-0.5">-20%</span></>
                )}
              </button>
            ))}
          </div>

          {/* Currency */}
          <div
            className="flex items-center glass-dark rounded-xl p-1 border border-[rgba(241,246,244,0.07)]"
            role="group"
            aria-label="Currency"
          >
            {CURRENCIES.map(c => (
              <button
                key={c}
                onClick={() => handleCurrency(c)}
                aria-pressed={currency === c}
                className={cn(
                  'px-4 py-2.5 rounded-lg text-sm font-mono font-medium',
                  currency === c
                    ? 'bg-nocturnal text-forsythia'
                    : 'text-[rgba(241,246,244,0.48)] hover:text-arctic',
                )}
                style={{ transition: 'background 250ms, color 175ms' }}
              >
                {CURRENCY_FLAGS[c]} {c}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan => (
            <PlanCard key={plan.key} plan={plan} currency={currency} billing={billing} />
          ))}
        </div>

        <p className="text-center text-xs text-[rgba(241,246,244,0.28)] font-mono mt-8">
          All plans include 14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  )
}
