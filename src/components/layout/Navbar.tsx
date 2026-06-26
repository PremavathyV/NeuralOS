'use client'

import { useState, useEffect } from 'react'
import { useNavScroll } from '@/hooks/useNavScroll'
import { LogoMark, XMarkIcon } from '@/components/icons'

const NAV_LINKS = [
  { label: 'Features',     href: '#features'    },
  { label: 'Platform',     href: '#bento'        },
  { label: 'Pricing',      href: '#pricing'      },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ',          href: '#faq'          },
]

export default function Navbar() {
  const scrolled        = useNavScroll(48)
  const [open, setOpen] = useState(false)

  /* Escape key closes mobile drawer */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  /* Prevent body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Main header ─────────────────────────────────────── */}
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? '12px 0' : '20px 0',
          transition: 'padding 300ms cubic-bezier(0.16,1,0.3,1), background 300ms, border-color 300ms, backdrop-filter 300ms',
          background: scrolled ? 'rgba(10,22,40,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'blur(0)',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.4)' : 'blur(0)',
          borderBottom: scrolled ? '1px solid rgba(241,246,244,0.06)' : '1px solid transparent',
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            aria-label="NeuralOS — go to top"
          >
            <LogoMark
              size={30}
              className="transition-transform duration-175 ease-out group-hover:scale-110"
            />
            <span className="font-mono font-bold text-[17px] tracking-tight text-arctic">
              Neural<span className="text-forsythia">OS</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="underline-hover text-[13px] font-medium text-[rgba(241,246,244,0.6)] hover:text-arctic transition-colors duration-175"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#"
              className="text-[13px] font-medium text-[rgba(241,246,244,0.55)] hover:text-arctic transition-colors duration-175"
            >
              Sign in
            </a>
            <a
              href="#pricing"
              className="magnetic inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[13px] font-semibold font-sans text-dark bg-forsythia shadow-gold-sm"
              style={{ transition: 'background-color 175ms ease-out, box-shadow 175ms ease-out' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FFD740' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FFC801' }}
            >
              Get Started
              <span>→</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 rounded-lg text-arctic hover:bg-[rgba(255,200,1,0.08)] transition-colors duration-175"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span
              className="block h-px rounded-full bg-arctic"
              style={{
                width: 20,
                transition: 'transform 250ms cubic-bezier(0.16,1,0.3,1)',
                transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block h-px rounded-full bg-arctic"
              style={{
                width: 20,
                transition: 'opacity 200ms, transform 250ms cubic-bezier(0.16,1,0.3,1)',
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block h-px rounded-full bg-arctic"
              style={{
                width: 14,
                transition: 'transform 250ms cubic-bezier(0.16,1,0.3,1)',
                transform: open ? 'translateY(-6px) rotate(-45deg) scaleX(1.43)' : 'none',
              }}
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* Backdrop */}
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,22,40,0.75)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            opacity: open ? 1 : 0,
            transition: 'opacity 300ms ease',
          }}
        />

        {/* Panel */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: 288,
            background: 'rgba(13,31,53,0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderLeft: '1px solid rgba(241,246,244,0.07)',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 24,
            paddingLeft: 24,
            paddingRight: 24,
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 380ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Close button — keyboard focusable */}
          <button
            onClick={() => setOpen(false)}
            className="self-end mb-8 p-2 rounded-lg text-arctic hover:text-forsythia transition-colors duration-175 focus:outline-none focus-visible:ring-2 focus-visible:ring-forsythia/60"
            aria-label="Close menu"
          >
            <XMarkIcon size={20} color="currentColor" />
          </button>

          {/* Nav links */}
          <ul className="flex flex-col gap-1" role="list">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3.5 rounded-xl font-medium text-[rgba(241,246,244,0.7)] hover:text-arctic hover:bg-[rgba(255,200,1,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-forsythia/50 rounded-xl"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateX(0)' : 'translateX(20px)',
                    transition: `opacity 350ms ${i * 50 + 80}ms, transform 350ms cubic-bezier(0.16,1,0.3,1) ${i * 50 + 80}ms, color 175ms, background 175ms`,
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Bottom CTAs */}
          <div className="mt-auto pb-10 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="w-full text-center px-5 py-3 rounded-xl text-sm font-medium text-arctic border border-[rgba(241,246,244,0.12)] hover:border-forsythia/35 transition-colors duration-175"
            >
              Sign in
            </a>
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-dark bg-forsythia hover:bg-[#FFD740] transition-colors duration-175"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
