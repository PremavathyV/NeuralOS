'use client'

import { useState } from 'react'
import { LogoMark, LinkSolidIcon, ArrowTrendingUpIcon, ChartPieIcon } from '@/components/icons'

const FOOTER_LINKS: Record<string, string[]> = {
  Product:    ['Features', 'Platform', 'Integrations', 'Changelog', 'Roadmap'],
  Developers: ['Documentation', 'API Reference', 'SDKs', 'Status Page', 'GitHub'],
  Company:    ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal:      ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'],
}

const SOCIALS = [
  { label: 'Twitter',  icon: <ArrowTrendingUpIcon size={15} color="currentColor" />, href: '#' },
  { label: 'GitHub',   icon: <LinkSolidIcon size={15} color="currentColor" />,       href: '#' },
  { label: 'LinkedIn', icon: <ChartPieIcon size={15} color="currentColor" />,        href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subbed, setSubbed] = useState(false)

  function onSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setSubbed(true)
  }

  return (
    <footer
      role="contentinfo"
      className="relative border-t border-[rgba(241,246,244,0.06)] pt-20 pb-10 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(17,76,90,0.09) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ── Top grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">

          {/* Brand + newsletter */}
          <div className="lg:col-span-2">
            <a href="#" aria-label="NeuralOS home" className="inline-flex items-center gap-3 mb-5 group">
              <LogoMark
                size={28}
                className="transition-transform duration-175 ease-out group-hover:scale-110"
              />
              <span className="font-mono font-bold text-[17px] text-arctic tracking-tight">
                Neural<span className="text-forsythia">OS</span>
              </span>
            </a>
            <p className="text-sm text-[rgba(241,246,244,0.42)] font-sans leading-relaxed mb-7 max-w-xs">
              The enterprise AI platform trusted by teams at the world&apos;s leading technology companies.
            </p>

            {/* Newsletter */}
            {subbed ? (
              <p className="text-sm font-mono text-forsythia">Thanks for subscribing ✓</p>
            ) : (
              <form onSubmit={onSubscribe} aria-label="Newsletter signup" className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 min-w-0 bg-[rgba(10,22,40,0.65)] border border-[rgba(241,246,244,0.09)] rounded-lg px-3 py-2.5 text-sm text-arctic font-sans placeholder:text-[rgba(241,246,244,0.24)] focus:outline-none focus:border-forsythia/30 transition-colors duration-175"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-forsythia text-dark text-sm font-semibold font-sans shrink-0"
                  style={{ transition: 'background-color 175ms ease-out' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor='#FFD740')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor='')}
                >
                  →
                </button>
              </form>
            )}
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-[10px] font-mono font-semibold text-[rgba(241,246,244,0.32)] uppercase tracking-[0.18em] mb-5">
                {group}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[rgba(241,246,244,0.48)] font-sans"
                      style={{ transition: 'color 175ms ease-out' }}
                      onMouseEnter={e => (e.currentTarget.style.color='#F1F6F4')}
                      onMouseLeave={e => (e.currentTarget.style.color='')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <div className="h-px bg-[rgba(241,246,244,0.06)] mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-xs text-[rgba(241,246,244,0.28)] font-mono">
            © {new Date().getFullYear()} NeuralOS, Inc. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-8 h-8 rounded-lg glass-dark border border-[rgba(241,246,244,0.07)] flex items-center justify-center text-[rgba(241,246,244,0.42)]"
                style={{ transition: 'color 175ms ease-out, border-color 175ms ease-out' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#FFC801'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,200,1,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color=''; (e.currentTarget as HTMLElement).style.borderColor='' }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute w-full h-full rounded-full bg-emerald-400 opacity-60 animate-pulse-ring" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] font-mono text-[rgba(241,246,244,0.32)]">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
