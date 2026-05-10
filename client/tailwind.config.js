export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50:'#eff6ff', 500:'#2563eb', 600:'#1d4ed8', 900:'#1e3a8a' },
        accent:  { 400:'#fb923c', 500:'#f97316', 600:'#ea580c' },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity:0, transform:'translateY(20px)' },
                   to:   { opacity:1, transform:'translateY(0)' } },
      },
      backdropBlur: { xs: '2px' },
    },
  },
};