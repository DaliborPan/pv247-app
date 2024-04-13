import { type PropsWithChildren } from 'react';

export const SidebarCard = ({
	title,
	customTitle,
	children
}: PropsWithChildren<{
	title?: React.ReactNode;
	customTitle?: React.ReactNode;
}>) => (
	<div className="py-6 pl-8 pr-6 rounded-lg bg-primary-100">
		{customTitle ? (
			customTitle
		) : title ? (
			<h3 className="mb-4 text-xl">{title}</h3>
		) : null}

		{children}
	</div>
);
