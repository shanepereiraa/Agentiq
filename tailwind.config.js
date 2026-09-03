/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './blog/*.html', './tools/*.html', './react-widgets/src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'DM Sans', 'sans-serif'],
      },
      colors: {
        ink: '#07173a',
        primary: '#FF6B5C',
        coral: '#FF6B5C',
        orange: '#FF9F45',
        primarySoft: '#FFB36B',
        cyan: '#22D3EE',
        blue: '#3B82F6',
        // "-deep" tokens: same hue family as their base color, darkened until
        // white text on a from/to gradient of the pair clears WCAG 4.5:1
        // (verified by hand — sRGB relative-luminance contrast against
        // #FFFFFF — each endpoint independently, since text can sit
        // anywhere along the gradient). Replaces the old text-shadow
        // contrast crutch on CTA buttons; used only where buttons carry
        // white text, not for decorative/icon uses of the base colors.
        'coral-deep': '#C0392B',    // 5.44:1
        'orange-deep': '#A85A1C',   // 5.07:1
        'cyan-deep': '#0E7C8C',     // 4.90:1
        'blue-deep': '#1E4FA3',     // 7.77:1
        'fuchsia-deep': '#9333A6',  // 6.43:1
        'pink-deep': '#A6265A',     // 6.90:1
        'emerald-deep': '#0D7A55',  // 5.34:1
        'teal-deep': '#0C6E66',     // 6.10:1
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-40px) scale(1.1)' },
          '66%': { transform: 'translate(-25px,25px) scale(0.95)' },
        },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        dot: { '0%,80%,100%': { transform: 'scale(0.6)', opacity: '0.4' }, '40%': { transform: 'scale(1)', opacity: '1' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
