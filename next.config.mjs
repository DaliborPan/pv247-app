import nextMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

const withMDX = nextMDX({
	// redirects: () => [
	// 	{
	// 		source: '/lector',
	// 		destination: '/lector/students?type=all',
	// 		permanent: true
	// 	},
	// 	{
	// 		source: '/lector/students',
	// 		destination: '/lector/students?type=all',
	// 		permanent: true
	// 	}
	// ],

	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [[rehypePrettyCode, { theme: 'aurora-x' }]]
	}
});

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };

export default withMDX(nextConfig);
