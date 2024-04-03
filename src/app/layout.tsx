import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { auth } from '@/auth';

import { cn } from '../lib/cn';

import { Navigation } from './_components/navigation';
import { SignInHero } from './_components/sign-in';
import { Providers } from './_components/providers';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
	title: 'PV247 app'
};

const RootLayout = async ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const session = await auth();

	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen flex flex-col bg-background',
					poppins.className
				)}
			>
				<Providers>
					{session ? (
						<>
							<Navigation />

							{children}
						</>
					) : (
						<SignInHero />
					)}
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
