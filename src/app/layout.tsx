import './globals.css';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/cn';
import { Providers } from '@/components/providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: {
    template: 'PV247 | %s',
    default: 'PV247 | Web Development Course'
  },
  description:
    'Learn web development with React and Next.js. PV247 course materials, lectures and weekly homework.'
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body
      className={cn(
        'flex min-h-screen flex-col bg-background text-text-primary',
        poppins.className
      )}
    >
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
