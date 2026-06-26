import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        arctic:    '#F1F6F4',
        forsythia: '#FFC801',
        nocturnal: '#114C5A',
        orange:    '#F5A623',
        dark:      '#0A1628',
        'dark-2':  '#0D1F35',
        'dark-3':  '#0B1A2E',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-gold':    'linear-gradient(135deg, #FFC801 0%, #F5A623 100%)',
        'gradient-teal':    'linear-gradient(135deg, #114C5A 0%, #1a6b7d 100%)',
        'gradient-hero':    'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,200,1,0.14) 0%, rgba(17,76,90,0.10) 40%, transparent 70%)',
      },
      boxShadow: {
        glass:     '0 8px 32px rgba(17,76,90,0.4), 0 0 0 1px rgba(255,200,1,0.08)',
        gold:      '0 0 48px rgba(255,200,1,0.28), 0 4px 24px rgba(0,0,0,0.3)',
        'gold-sm': '0 0 22px rgba(255,200,1,0.18)',
        glow:      '0 0 60px rgba(255,200,1,0.20)',
        card:      '0 24px 48px rgba(0,0,0,0.35)',
      },
      keyframes: {
        /* entrance */
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'blur-in': {
          '0%':   { opacity: '0', filter: 'blur(12px)', transform: 'translateY(12px)' },
          '100%': { opacity: '1', filter: 'blur(0px)',  transform: 'translateY(0)' },
        },
        /* continuous */
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        'float-x': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%':      { transform: 'translateX(-8px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,200,1,0.18), 0 0 40px rgba(255,200,1,0.06)' },
          '50%':      { boxShadow: '0 0 40px rgba(255,200,1,0.45), 0 0 80px rgba(255,200,1,0.18)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)',   opacity: '0.5' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        'shimmer-bg': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'gradient-drift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%':      { transform: 'scaleY(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        'count-up': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        orbit: {
          'from': { transform: 'rotate(0deg) translateX(56px) rotate(0deg)' },
          'to':   { transform: 'rotate(360deg) translateX(56px) rotate(-360deg)' },
        },
        'border-spin': {
          'from': { transform: 'rotate(0deg)' },
          'to':   { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        /* entrance — GPU only */
        'fade-up':   'fade-up  0.65s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':   'fade-in  0.5s  cubic-bezier(0.16,1,0.3,1) both',
        'scale-in':  'scale-in 0.55s cubic-bezier(0.16,1,0.3,1) both',
        'blur-in':   'blur-in  0.7s  cubic-bezier(0.16,1,0.3,1) both',
        /* continuous */
        float:          'float     4.5s ease-in-out infinite',
        'float-slow':   'float     6.5s ease-in-out infinite',
        'float-x':      'float-x   5s   ease-in-out infinite',
        marquee:        'marquee   30s  linear infinite',
        'pulse-glow':   'pulse-glow 2.8s ease-in-out infinite',
        'pulse-ring':   'pulse-ring 2.2s ease-out  infinite',
        'spin-slow':    'spin-slow  12s  linear    infinite',
        shimmer:        'shimmer    3.5s linear     infinite',
        'shimmer-bg':   'shimmer-bg 2.5s linear     infinite',
        'gradient-drift':'gradient-drift 6s ease infinite',
        wave:           'wave       1s   ease-in-out infinite',
        blink:          'blink      1s   step-end   infinite',
        orbit:          'orbit      8s   linear     infinite',
        'border-spin':  'border-spin 4s  linear     infinite',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in':  'cubic-bezier(0.7, 0, 0.84, 0)',
        'expo-io':  'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      transitionDuration: {
        '175': '175ms',
        '350': '350ms',
        '450': '450ms',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '3.5xl': '1.75rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
