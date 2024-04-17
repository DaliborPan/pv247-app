import Link, { type LinkProps } from 'next/link';
import { type PropsWithChildren } from 'react';
import { type User } from 'next-auth';
import { signOut } from 'next-auth/react';

import { Button } from '../base/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../base/dropdown';
import { SignIn } from '../sign-in';

const DropdownMenuLinkItem = ({
	children,
	...linkProps
}: PropsWithChildren<LinkProps>) => (
	<DropdownMenuItem asChild>
		<Link {...linkProps}>{children}</Link>
	</DropdownMenuItem>
);

export const MobileNavigation = ({
	user,
	isUserLoading = false
}: {
	user?: User;
	isUserLoading?: boolean;
}) => (
	<div className="flex items-center gap-x-3 grow lg:hidden">
		<div className="grow" />

		{isUserLoading || user ? null : (
			<SignIn>
				{/* Temporary: disabled */}
				<Button disabled size="sm" variant="outline/primary">
					Sign in
				</Button>
			</SignIn>
		)}

		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="sm"
					variant="outline/primary"
					iconLeft={{
						name: 'Menu'
					}}
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuLinkItem href="/">Home</DropdownMenuLinkItem>
				<DropdownMenuLinkItem href="/lectures">Lectures</DropdownMenuLinkItem>
				<DropdownMenuLinkItem href="/homeworks">Homeworks</DropdownMenuLinkItem>

				{isUserLoading ? null : user?.role === 'lector' ? (
					<DropdownMenuLinkItem href="/lector">Lector</DropdownMenuLinkItem>
				) : (
					<DropdownMenuLinkItem href="/project">Project</DropdownMenuLinkItem>
				)}

				{!user ? null : (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuLinkItem href="/profile">Profile</DropdownMenuLinkItem>
						<DropdownMenuItem asChild>
							<button onClick={() => signOut()} className="">
								Logout
							</button>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);
