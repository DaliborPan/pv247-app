import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { auth } from '@/auth';

import { cn } from '../lib/cn';

import { Navigation } from './_components/navigation';

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
				{session ? (
					<>
						<Navigation />

						{children}
					</>
				) : (
					children
				)}
			</body>
		</html>
	);
};

export default RootLayout;
