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
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: [
      '@/db',

      '@/modules/project',
      '@/modules/session-user',
      '@/modules/student',
      '@/modules/shared'
    ]
  }
};

export default withMDX(nextConfig);
