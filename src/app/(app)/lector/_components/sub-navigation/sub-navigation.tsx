'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

const NavigationItem = ({
	children,
	href
}: PropsWithChildren<{ href: string }>) => {
	const pathname = usePathname();

	const isActive = pathname.startsWith(href);

	return (
		<li className={cn('px-3 py-1 rounded-sm', isActive && 'bg-primary-200')}>
			<Link href={href}>{children}</Link>
		</li>
	);
};

export const SubNavigation = () => (
	<div className="bg-primary-100">
		<nav className="ml-[calc(7.5rem+100px)]">
			<ul className="flex py-3 gap-x-8">
				<NavigationItem href="/lector/students">Students</NavigationItem>
				<NavigationItem href="/lector/homeworks">Homeworks</NavigationItem>
				<NavigationItem href="/lector/projects">Projects</NavigationItem>
			</ul>
		</nav>
	</div>
);
