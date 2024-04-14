import Image from 'next/image';
import Link from 'next/link';
import { type User } from 'next-auth';

import { cn } from '@/lib/cn';
import { Button } from '@/components/base/button';

import MUNI_LOGO from '../../../public/muni-logo.png';
import { SignIn } from '../sign-in';

import { NavigationItem } from './navigation-item';
import { LogoutButton } from './logout-button';

const NavigationDelimiter = ({ className }: { className?: string }) => (
	<div className={cn('mx-6 h-5 w-[2px] bg-[#B9BBC6]', className)} />
);

const UserMenuItem = ({ user }: { user: User }) => (
	<Link href="/profile" className="flex items-center gap-x-3">
		<div className="rounded-full size-8 bg-neutral" />

		<span>{user.name}</span>
	</Link>
);

export const Navigation = ({
	user,
	isUserLoading = false
}: {
	user?: User;
	isUserLoading?: boolean;
}) => (
	<header className="sticky top-0 z-20 flex items-center px-10 py-2 mb-8 bg-white border-b gap-x-20">
		<Image src={MUNI_LOGO} width={100} alt="muni-logo" />

		<nav className="grow">
			<ul className="flex items-center gap-x-10">
				<NavigationItem href="/">Home</NavigationItem>
				<NavigationItem href="/lectures">Lectures</NavigationItem>
				<NavigationItem href="/homeworks">Homeworks</NavigationItem>
				{isUserLoading ? null : user?.role === 'lector' ? (
					<NavigationItem href="/lector">Lector</NavigationItem>
				) : (
					<NavigationItem href="/project">Project</NavigationItem>
				)}
			</ul>
		</nav>

		{isUserLoading ? null : user ? (
			<div className="flex items-center">
				<UserMenuItem user={user} />
				<NavigationDelimiter className="mr-4" />
				<LogoutButton />
			</div>
		) : (
			<SignIn>
				<Button
					size="sm"
					variant="outline/primary"
					iconLeft={{
						name: 'Github'
					}}
				>
					Sign in
				</Button>
			</SignIn>
		)}
	</header>
);
