// const withMDX = require('@next/mdx')();
import nextMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	pageExtensions: ['mdx', 'ts', 'tsx']
// };

const withMDX = nextMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [[rehypePrettyCode, { theme: 'aurora-x' }]]
	}
});

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };

export default withMDX(nextConfig);
