import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://neuralos.ai'),
  title: {
    default: 'NeuralOS — Premium AI Platform',
    template: '%s | NeuralOS',
  },
  description:
    'Enterprise-grade AI infrastructure. Build, deploy and scale intelligent workflows at the speed of thought. Trusted by the world\'s leading AI teams.',
  keywords: ['AI platform', 'machine learning', 'AI agents', 'enterprise AI', 'inference', 'fine-tuning'],
  authors: [{ name: 'NeuralOS' }],
  creator: 'NeuralOS',
  openGraph: {
    title: 'NeuralOS — Premium AI Platform',
    description: 'Enterprise-grade AI infrastructure. Build, deploy and scale intelligent workflows.',
    type: 'website',
    url: 'https://neuralos.ai',
    siteName: 'NeuralOS',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'NeuralOS — Premium AI Platform' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuralOS — Premium AI Platform',
    description: 'Enterprise-grade AI infrastructure.',
    creator: '@neuralos',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://neuralos.ai' },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
}

/* ── JSON-LD structured data ─────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://neuralos.ai/#organization',
      name: 'NeuralOS',
      url: 'https://neuralos.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://neuralos.ai/og.png',
      },
      sameAs: [
        'https://twitter.com/neuralos',
        'https://github.com/neuralos',
        'https://linkedin.com/company/neuralos',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://neuralos.ai/#software',
      name: 'NeuralOS',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      description:
        'Enterprise-grade AI infrastructure. Build, deploy and scale intelligent workflows at the speed of thought.',
      offers: [
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '29',
          priceCurrency: 'USD',
          billingPeriod: 'P1M',
        },
        {
          '@type': 'Offer',
          name: 'Pro',
          price: '79',
          priceCurrency: 'USD',
          billingPeriod: 'P1M',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise',
          price: '199',
          priceCurrency: 'USD',
          billingPeriod: 'P1M',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://neuralos.ai/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What models does NeuralOS support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NeuralOS supports 40+ models including GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Mistral Large, Llama 3.1 405B and every major open-source model via Hugging Face.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the 20% annual discount work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When you switch to annual billing, we apply a flat 20% discount to your monthly rate across all plans.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is my data used to train models?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Your data is never used to train or improve any models. All inference data is encrypted in transit and at rest.',
          },
        },
        {
          '@type': 'Question',
          name: 'What compliance certifications do you hold?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NeuralOS is SOC 2 Type II certified and HIPAA-ready on the Enterprise plan.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is your uptime SLA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Starter: 99.5%, Pro: 99.9%, Enterprise: up to 99.99% with financial credits.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-dark text-arctic">
        {/* Skip to content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-forsythia focus:text-dark focus:font-semibold focus:font-sans focus:text-sm focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
