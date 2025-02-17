import type { MDXComponents } from 'mdx/types';
import Image, { type ImageProps } from 'next/image';

import { MdxImage, MdxCodeBlock, MdxComment } from './components/mdx/';

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
  // headings
  h1: ({ children }) => (
    <h1 className="mb-8 mt-20 text-5xl leading-tight">{children}</h1>
  ),
  h2: ({ children }) => <h2 className="mb-6 mt-12 text-3xl">{children}</h2>,
  h3: ({ children }) => (
    <h3 className="mb-4 mt-10 text-xl font-medium text-primary">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-4 mt-8 font-medium text-primary">{children}</h4>
  ),

  // lists
  ul: ({ children }) => <ul className="mb-6 list-disc pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="mb-6 list-decimal pl-6">{children}</ol>,
  li: ({ children }) => (
    <li className="my-2 font-light leading-8 text-markdown">{children}</li>
  ),

  // text
  p: ({ children }) => (
    <p className="my-4 text-lg font-light leading-8 text-markdown">
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      className="ml-px text-primary underline hover:no-underline"
      {...props}
      target="_blank"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-black">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="font-normal not-italic text-primary">{children}</em>
  ),

  // code
  code: ({ children }) => (
    <code className="rounded-lg bg-primary-100 px-2 py-1 text-sm">
      {children}
    </code>
  ),
  pre: ({ children }) => <MdxCodeBlock>{children}</MdxCodeBlock>,

  // image
  img: ({ src, alt }) => (
    <Image
      src={src ?? ''}
      alt={alt ?? ''}
      className="rounded shadow"
      width={500}
      height={1}
    />
  ),

  // other
  hr: () => <hr className="my-8 border-t border-gray-200" />,

  MdxImage: (props: ImageProps) => <MdxImage {...props} alt={props.alt} />,
  MdxComment: ({ children, className }) => (
    <MdxComment className={className}>{children}</MdxComment>
  ),

  ...components
});
