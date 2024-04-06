/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

	theme: {
		extend: {
			container: {
				center: true
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

				'primary-foreground': '#ffffff',
				'destructive': 'hsl(0 72.22% 50.59%)',
				'destructive-foreground': 'hsl(210 40% 98%)',

				'accent': 'hsl(210 40% 96.1%)',
				'accent-foreground': 'hsl(222.2 47.4% 11.2%)',

				'muted': 'hsl(217.2 32.6% 17.5%)',
				'muted-foreground': 'hsl(215 20.2% 65.1%)',

				// `p` tag in lecture
				'markdown': 'hsl(222deg, 22%, 5%)'
			}
		}
	}
};
