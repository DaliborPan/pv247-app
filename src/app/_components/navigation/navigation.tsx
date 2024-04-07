import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/auth';
import { cn } from '@/lib/cn';

import MUNI_LOGO from '../../../../public/muni-logo.png';

import { NavigationItem } from './navigation-item';
import { LogoutButton } from './logout-button';

const NavigationDelimiter = ({ className }: { className?: string }) => (
	<div className={cn('mx-6 h-5 w-[2px] bg-[#B9BBC6]', className)} />
);

const UserMenuItem = async () => {
	const session = await auth();

	return (
		<Link href="/profile" className="flex items-center gap-x-3">
			<div className="rounded-full size-8 bg-neutral" />

			<span>{session?.user.name}</span>
		</Link>
	);
};

export const Navigation = async () => {
	const session = await auth();

	return (
		<header className="sticky top-0 z-20 flex items-center px-10 py-2 mb-8 bg-white border-b gap-x-20">
			<Image src={MUNI_LOGO} width={100} alt="muni-logo" />

			<nav className="grow">
				<ul className="flex items-center gap-x-10">
					<NavigationItem href="/">Home</NavigationItem>
					<NavigationItem href="/lectures">Lectures</NavigationItem>
					<NavigationItem href="/homeworks">Homeworks</NavigationItem>
					{session?.user.role === 'lector' ? (
						<NavigationItem href="/lector">Lector</NavigationItem>
					) : (
						<NavigationItem href="/project">Project</NavigationItem>
					)}
				</ul>
			</nav>

			<div className="flex items-center">
				<UserMenuItem />
				<NavigationDelimiter className="mr-4" />
				<LogoutButton />
			</div>
		</header>
	);
};
