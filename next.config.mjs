import nextMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

const withMDX = nextMDX({
	redirects: () => [
		{
			source: '/lector',
			destination: '/lector/students',
			permanent: true
		}
	],

	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [[rehypePrettyCode, { theme: 'aurora-x' }]]
	}
});

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };

export default withMDX(nextConfig);
