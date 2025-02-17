/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },

      fontSize: {
        xxs: '.625rem'
      },

      colors: {
        'neutral': '#f7f7fa',
        'background': '#f7f7fa',

        'primary': '#0000d2',
        'primary-100': '#ebebff',
        'primary-200': '#d6d6ff',
        'primary-300': '#a8a8ff',
        'primary-400': '#3d3dff',
        'primary-500': '#0000d2',
        'primary-600': '#0000c7',
        'primary-700': '#0000a3',
        'primary-800': '#000075',
        'primary-900': '#000047',

        'neutral-50': '#f6f6f6',
        'neutral-100': '#e7e7e7',
        'neutral-200': '#d1d1d1',
        'neutral-300': '#b0b0b0',
        'neutral-400': '#888888',
        'neutral-500': '#6d6d6d',
        'neutral-600': '#5d5d5d',
        'neutral-700': '#4f4f4f',
        'neutral-800': '#454545',
        'neutral-900': '#3b3b3b',
        'neutral-950': '#262626',

        'destructive': 'hsl(0 72.22% 50.59%)',
        'destructive-foreground': 'hsl(210 40% 98%)',

        'accent': 'hsl(210 40% 96.1%)',
        'accent-foreground': 'hsl(222.2 47.4% 11.2%)',

        'muted': 'hsl(217.2 32.6% 17.5%)',
        'muted-foreground': 'hsl(215 20.2% 65.1%)',

        // `p` tag in lecture
        'markdown': 'hsl(222deg, 22%, 5%)',

        // text
        'text-primary': '#262626', // neutral-950
        'text-secondary': '#4f4f4f', // neutral-700
        'text-terciary': '#6d6d6d', // neutral-500
        'text-primary-color': '#0000a3' // primary-700
      }
    }
  },

  plugins: [require('@tailwindcss/typography')]
};
