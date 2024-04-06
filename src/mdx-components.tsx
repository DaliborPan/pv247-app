import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
	// headings
	h1: ({ children }) => <h1 className="mt-20 mb-8 text-5xl">{children}</h1>,
	h2: ({ children }) => <h2 className="mt-12 mb-6 text-3xl">{children}</h2>,
	h3: ({ children }) => (
		<h3 className="mt-10 mb-4 text-xl font-medium text-primary">{children}</h3>
	),
	h4: ({ children }) => (
		<h4 className="mt-8 mb-4 font-medium text-primary">{children}</h4>
	),

	// lists
	ul: ({ children }) => <ul className="pl-6 mb-6 list-disc">{children}</ul>,
	ol: ({ children }) => <ol className="pl-6 mb-6 list-decimal">{children}</ol>,
	li: ({ children }) => (
		<li className="my-2 font-light text-markdown leading-8">{children}</li>
	),

	// text
	p: ({ children }) => (
		<p className="my-4 text-lg font-light leading-8 text-markdown">
			{children}
		</p>
	),
	a: ({ children, ...props }) => (
		<a
			className="ml-px underline text-primary hover:no-underline"
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
		<em className="not-italic text-primary font-normal">{children}</em>
	),

	// code
	code: ({ children }) => (
		<code className="px-2 py-1 text-sm rounded-lg bg-primary-100">
			{children}
		</code>
	),
	pre: ({ children }) => (
		<pre className="p-4 my-6 bg-[#0c0c1a] shadow rounded-lg [&>code]:bg-transparent [&>code]:px-0">
			{children}
		</pre>
	),

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
	...components
});
