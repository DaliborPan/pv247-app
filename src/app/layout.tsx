import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { cn } from '../lib/cn';

import { Providers } from './_components/providers';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
	title: 'PV247 app'
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body
			className={cn(
				'min-h-screen flex flex-col bg-background',
				poppins.className
			)}
		>
			<Providers>{children}</Providers>
		</body>
	</html>
);

export default RootLayout;
