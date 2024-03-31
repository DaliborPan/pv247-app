import Image from 'next/image';

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
		<div className="flex items-center gap-x-3">
			<div className="size-8 rounded-full bg-neutral" />

			<span>{session?.user.name}</span>
		</div>
	);
};

export const Navigation = () => (
	<header className="px-10 flex items-center gap-x-20 border-b py-2 mb-8 bg-white">
		<Image src={MUNI_LOGO} width={100} alt="muni-logo" />

		<nav className="grow">
			<ul className="flex items-center gap-x-10">
				<NavigationItem href="/">Home</NavigationItem>
				<NavigationItem href="/lectures">Lectures</NavigationItem>
				<NavigationItem href="/homeworks">Homeworks</NavigationItem>
				<NavigationItem href="/project">Project</NavigationItem>
			</ul>
		</nav>

		<div className="flex items-center">
			<UserMenuItem />
			<NavigationDelimiter className="mr-4" />
			<LogoutButton />
		</div>
	</header>
);
