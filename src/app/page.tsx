'use client'

import dynamic from 'next/dynamic'
import Navbar    from '@/components/layout/Navbar'
import Hero      from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import Footer    from '@/components/layout/Footer'

/* Lazy-load all below-fold sections for optimal TTI */
const Features     = dynamic(() => import('@/components/sections/Features'),     { ssr: true })
const BentoGrid    = dynamic(() => import('@/components/sections/BentoGrid'),    { ssr: true })
const Statistics   = dynamic(() => import('@/components/sections/Statistics'),   { ssr: true })
const Workflow     = dynamic(() => import('@/components/sections/Workflow'),     { ssr: true })
const Pricing      = dynamic(() => import('@/components/sections/Pricing'),      { ssr: true })
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: true })
const FAQ          = dynamic(() => import('@/components/sections/FAQ'),          { ssr: true })
const CTA          = dynamic(() => import('@/components/sections/CTA'),          { ssr: true })
const Contact      = dynamic(() => import('@/components/sections/Contact'),      { ssr: true })
const CursorGlow   = dynamic(() => import('@/components/layout/CursorGlow'),    { ssr: false })

export default function Home() {
  return (
    <>
      {/* Cursor glow — client only, no SSR */}
      <CursorGlow />

      <Navbar />

      <main id="main-content" className="page-enter">
        <Hero />
        <TrustedBy />
        <Features />
        <BentoGrid />
        <Statistics />
        <Workflow />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
