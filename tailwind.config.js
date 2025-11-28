/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian & Gold Palette
        obsidian: '#0a0a0a',
        charcoal: '#121212',
        gold: {
          muted: '#c5a059',
          bright: '#e6c278',
        },
        surface: '#1a1a1a',
        
        // Legacy/Semantic mapping
        primary: {
          400: '#c5a059', // Muted Gold
          500: '#b08d4b',
          600: '#9b7a3d',
          900: '#0a0a0a', // Obsidian
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #c5a059, #e6c278, #c5a059)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shine': 'shine 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shine: {
          'to': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}

