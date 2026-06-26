export type Currency = 'USD' | 'INR' | 'EUR'
export type Billing  = 'monthly' | 'annual'
export type PlanKey  = 'starter' | 'pro' | 'enterprise'

/** Base monthly prices in USD */
const BASE_PRICES_USD: Record<PlanKey, number> = {
  starter:    29,
  pro:        79,
  enterprise: 199,
}

/** Regional tariff multipliers relative to USD */
const CURRENCY_MULTIPLIERS: Record<Currency, number> = {
  USD: 1,
  INR: 83.5,
  EUR: 0.92,
}

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
}

const CURRENCY_LOCALES: Record<Currency, string> = {
  USD: 'en-US',
  INR: 'en-IN',
  EUR: 'de-DE',
}

const ANNUAL_DISCOUNT = 0.20 // 20% off

export interface PriceResult {
  monthly:       number
  annual:        number  // per-month price when billed annually
  annualTotal:   number  // total billed once per year
  symbol:        string
  displayPrice:  string  // formatted per-month
  displayAnnual: string  // "Billed X annually"
  savings:       string  // "Save X/yr"
}

/**
 * Pure pricing engine — no hardcoded display prices.
 * All prices are derived from the USD base × multiplier × billing period.
 */
export function computePrice(
  plan: PlanKey,
  currency: Currency,
  billing: Billing
): PriceResult {
  const multiplier    = CURRENCY_MULTIPLIERS[currency]
  const symbol        = CURRENCY_SYMBOLS[currency]
  const locale        = CURRENCY_LOCALES[currency]
  const baseUsd       = BASE_PRICES_USD[plan]

  const monthlyLocal   = baseUsd * multiplier
  const annualMonthly  = monthlyLocal * (1 - ANNUAL_DISCOUNT)
  const annualTotal    = annualMonthly * 12
  const yearlySavings  = monthlyLocal * 12 - annualTotal

  const fmt = (n: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: currency === 'INR' ? 0 : 0,
      maximumFractionDigits: currency === 'INR' ? 0 : 0,
    }).format(Math.round(n))

  const current = billing === 'monthly' ? monthlyLocal : annualMonthly

  return {
    monthly:       monthlyLocal,
    annual:        annualMonthly,
    annualTotal:   annualTotal,
    symbol,
    displayPrice:  `${symbol}${fmt(current)}`,
    displayAnnual: `Billed ${symbol}${fmt(annualTotal)} annually`,
    savings:       `Save ${symbol}${fmt(yearlySavings)}/yr`,
  }
}

export { CURRENCY_SYMBOLS, BASE_PRICES_USD }
