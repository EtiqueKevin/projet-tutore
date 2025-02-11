/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6', // More vibrant blue
          dark: '#1E40AF',  // Deep blue
        },
        secondary: {
          light: '#10B981', // Emerald green
          dark: '#059669',  // Darker emerald
        },
        main: {
          light: '#F9FAFB', // Slightly warmer white
          dark: '#111827',  // Rich dark blue/black
        },
        background: {
          light: '#e4e7eb', // Light gray with slight warmth
          dark: '#1F2937',  // Softer dark background
        },
      },
      typography: ({ theme }) => ({
        white: {
          css: {
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray[300]'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray[400]'),
            '--tw-prose-bullets': theme('colors.gray[600]'),
            '--tw-prose-hr': theme('colors.gray[700]'),
            '--tw-prose-quotes': theme('colors.gray[100]'),
            '--tw-prose-quote-borders': theme('colors.gray[700]'),
            '--tw-prose-captions': theme('colors.gray[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.gray[300]'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-th-borders': theme('colors.gray[600]'),
            '--tw-prose-td-borders': theme('colors.gray[700]'),
            '--tw-prose-invert-body': theme('colors.gray[200]'),
            '--tw-prose-invert-headings': theme('colors.black'),
            '--tw-prose-invert-lead': theme('colors.gray[300]'),
            '--tw-prose-invert-links': theme('colors.black'),
            '--tw-prose-invert-bold': theme('colors.black'),
            '--tw-prose-invert-counters': theme('colors.gray[400]'),
            '--tw-prose-invert-bullets': theme('colors.gray[600]'),
            '--tw-prose-invert-hr': theme('colors.gray[700]'),
            '--tw-prose-invert-quotes': theme('colors.gray[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.gray[700]'),
            '--tw-prose-invert-captions': theme('colors.gray[400]'),
            '--tw-prose-invert-code': theme('colors.black'),
            '--tw-prose-invert-pre-code': theme('colors.gray[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.gray[600]'),
            '--tw-prose-invert-td-borders': theme('colors.gray[700]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class', 
}