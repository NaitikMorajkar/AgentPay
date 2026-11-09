/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050508',
        surface: {
          DEFAULT: '#0a0a12',
          card: 'rgba(15, 15, 25, 0.7)',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.12)',
        },
        electric: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          violet: '#8a2be2',
          purple: '#9d4edd',
          glow: '#00e5ff',
        },
        paypal: {
          blue: '#003087',
          lightBlue: '#0079c1',
          gold: '#ffc439',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.8s ease-in-out infinite alternate',
        'shimmer': 'shimmer 4s linear infinite',
        'radar-sweep': 'radarSweep 3s linear infinite',
        'beacon': 'beacon 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'border-spin': 'borderSpin 6s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(10px, -12px) scale(1.03)' },
          '66%': { transform: 'translate(-8px, 6px) scale(0.98)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        glowPulse: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(0, 242, 254, 0.35))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 35px rgba(157, 78, 221, 0.75))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        beacon: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '70%': { transform: 'scale(2.4)', opacity: '0' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        borderSpin: {
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(0, 242, 254, 0.35)',
        'glow-violet': '0 0 35px -5px rgba(138, 43, 226, 0.4)',
        'glow-multi': '0 0 50px -10px rgba(0, 242, 254, 0.3), 0 0 50px -10px rgba(157, 78, 221, 0.3)',
      }
    },
  },
  plugins: [],
}
