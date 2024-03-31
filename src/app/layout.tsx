import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { cn } from '../lib/cn';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

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
			className={cn('min-h-screen flex flex-col bg-neutral', poppins.className)}
		>
			{children}
		</body>
	</html>
);

export default RootLayout;
