import nextMDX from '@next/mdx';

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: ['rehype-highlight']
  }
});

const nextConfig = {
  pageExtensions: ['mdx', 'tsx', 'ts']
};

export default withMDX(nextConfig);
