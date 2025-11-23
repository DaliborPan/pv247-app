import nextMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, { theme: 'aurora-x' }]]
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'tsx', 'ts']
};

export default withMDX(nextConfig);
