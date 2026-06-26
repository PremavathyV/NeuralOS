'use client'

import { useState, useCallback } from 'react'
import { useScrollObserver } from '@/hooks/useScrollObserver'
import { SearchIcon, LinkSolidIcon, ArrowPathIcon } from '@/components/icons'

type FormState = 'idle' | 'sending' | 'sent'
interface Fields { name: string; email: string; company: string; message: string }

const INPUT_CLASS = `
  w-full bg-[rgba(10,22,40,0.55)] border border-[rgba(241,246,244,0.09)] rounded-xl px-4 py-3.5
  text-sm text-arctic font-sans placeholder:text-[rgba(241,246,244,0.28)]
  focus:outline-none focus:border-forsythia/38 focus:bg-[rgba(10,22,40,0.75)]
  transition-colors duration-175
`

export default function Contact() {
  const headRef = useScrollObserver<HTMLDivElement>()
  const formRef = useScrollObserver<HTMLDivElement>()
  const [fields, setFields] = useState<Fields>({ name: '', email: '', company: '', message: '' })
  const [state, setState] = useState<FormState>('idle')

  const update = useCallback((k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields(p => ({ ...p, [k]: e.target.value })), [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    await new Promise(r => setTimeout(r, 1200))
    setState('sent')
  }

  return (
    <section id="contact" aria-label="Contact us" className="relative py-32 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(17,76,90,0.18) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div ref={headRef} className="observe-fade-left">
            <p className="text-[11px] font-mono font-semibold text-forsythia tracking-[0.22em] uppercase mb-5">
              Contact
            </p>
            <h2
              className="font-mono font-extrabold tracking-tight leading-tight mb-6 text-balance"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
            >
              <span className="text-arctic">Start the</span>
              <br />
              <span className="shimmer-text">conversation.</span>
            </h2>
            <p className="text-base text-[rgba(241,246,244,0.52)] font-sans leading-relaxed mb-10 max-w-md">
              Whether you&apos;re evaluating NeuralOS for a Fortune 500 deployment or
              building a weekend prototype, we want to hear from you.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-5">
              {[
                { icon: <SearchIcon size={17} color="#FFC801" />,    label: 'Sales',   val: 'sales@neuralos.ai'   },
                { icon: <LinkSolidIcon size={17} color="#FFC801" />, label: 'Support', val: 'support@neuralos.ai' },
                { icon: <ArrowPathIcon size={17} color="#FFC801" />, label: 'Careers', val: 'jobs@neuralos.ai'    },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-4 group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[rgba(255,200,1,0.07)] border border-[rgba(255,200,1,0.13)]"
                    style={{ transition: 'background 175ms, border-color 175ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,200,1,0.14)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,200,1,0.3)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background=''; (e.currentTarget as HTMLElement).style.borderColor='' }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[rgba(241,246,244,0.36)] uppercase tracking-[0.16em]">{c.label}</div>
                    <a
                      href={`mailto:${c.val}`}
                      className="text-sm text-arctic font-sans"
                      style={{ transition: 'color 175ms' }}
                      onMouseEnter={e => (e.currentTarget.style.color='#FFC801')}
                      onMouseLeave={e => (e.currentTarget.style.color='')}
                    >
                      {c.val}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="observe-fade-right">
            <div className="glass gradient-border rounded-3xl p-8">
              {state === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-14 text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-[rgba(255,200,1,0.09)] border border-forsythia/25 flex items-center justify-center text-2xl text-forsythia animate-pulse-glow">
                    ✓
                  </div>
                  <h3 className="font-mono font-bold text-xl text-arctic">Message sent!</h3>
                  <p className="text-sm text-[rgba(241,246,244,0.52)] font-sans max-w-xs">
                    We&apos;ll get back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setState('idle'); setFields({ name:'',email:'',company:'',message:'' }) }}
                    className="text-xs font-mono text-forsythia mt-2"
                    style={{ transition: 'opacity 175ms' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity='0.7')}
                    onMouseLeave={e => (e.currentTarget.style.opacity='1')}
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] font-mono text-[rgba(241,246,244,0.45)] mb-2 tracking-wide uppercase">
                        Full Name
                      </label>
                      <input id="contact-name" type="text" autoComplete="name" required
                        placeholder="Ada Lovelace"
                        value={fields.name} onChange={update('name')}
                        className={INPUT_CLASS} />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-[11px] font-mono text-[rgba(241,246,244,0.45)] mb-2 tracking-wide uppercase">
                        Work Email
                      </label>
                      <input id="contact-email" type="email" autoComplete="email" required
                        placeholder="ada@company.com"
                        value={fields.email} onChange={update('email')}
                        className={INPUT_CLASS} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-[11px] font-mono text-[rgba(241,246,244,0.45)] mb-2 tracking-wide uppercase">
                      Company
                    </label>
                    <input id="contact-company" type="text" autoComplete="organization"
                      placeholder="Acme Corp"
                      value={fields.company} onChange={update('company')}
                      className={INPUT_CLASS} />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] font-mono text-[rgba(241,246,244,0.45)] mb-2 tracking-wide uppercase">
                      Message
                    </label>
                    <textarea id="contact-message" rows={5} required
                      placeholder="Tell us about your use case…"
                      value={fields.message} onChange={update('message')}
                      className={`${INPUT_CLASS} resize-none`} />
                  </div>
                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="w-full py-4 rounded-xl font-semibold font-sans text-sm text-dark bg-forsythia shadow-gold-sm disabled:opacity-55 disabled:cursor-not-allowed"
                    style={{ transition: 'background-color 175ms ease-out' }}
                    onMouseEnter={e => { if (state !== 'sending') (e.currentTarget as HTMLElement).style.backgroundColor='#FFD740' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor='' }}
                  >
                    {state === 'sending' ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin-slow" />
                        Sending…
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
