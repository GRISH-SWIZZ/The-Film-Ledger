export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'swiss-red': '#FF0000',
        'swiss-red-hover': '#CC0000',
        'swiss-white': '#FFFFFF',
        'swiss-black': '#111111',
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        'gray-100': '#F2F2F2',
        'gray-200': '#E5E5E5',
        'gray-300': '#CCCCCC',
        'gray-400': '#999999',
        'success': '#00CC00',
        'error': '#FF3333',
        'warning': '#FFAA00',
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(0, 0%, 0%)",
        primary: {
          DEFAULT: "#FF0000",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#111111",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F2F2F2",
          foreground: "#111111",
        },
        muted: {
          DEFAULT: "#E5E5E5",
          foreground: "#666666",
        },
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
        '128': '128px',
      },
      borderRadius: {
        'none': '0px',
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "zoom-out": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.95)" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "zoom-in": "zoom-in 0.2s ease-out",
        "zoom-out": "zoom-out 0.2s ease-out",
        "in": "fade-in 0.2s ease-out, zoom-in 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
