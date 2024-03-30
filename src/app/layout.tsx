import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

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
		<body className={poppins.className}>{children}</body>
	</html>
);

export default RootLayout;
