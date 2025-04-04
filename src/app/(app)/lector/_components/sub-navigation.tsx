'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';
import { homeworkSlugSchema } from '@/db/schema/lectures';

const NavigationItem = ({
  children,
  href
}: PropsWithChildren<{ href: string }>) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <li
      className={cn(
        'flex px-3 py-2 lg:rounded lg:py-1',
        isActive && 'bg-primary-200'
      )}
    >
      <Link href={href} className="w-full">
        {children}
      </Link>
    </li>
  );
};

export const SubNavigation = () => (
  <div className="bg-primary-100">
    <nav className="lg:ml-[calc(7.5rem+100px)]">
      <ul className="flex flex-col gap-x-8 py-3 lg:flex-row">
        <NavigationItem href="/lector/students">Students</NavigationItem>
        <NavigationItem
          href={`/lector/homeworks/${homeworkSlugSchema.options[0]}`}
        >
          Homework
        </NavigationItem>
        <NavigationItem href="/lector/projects">Projects</NavigationItem>
        <NavigationItem href="/lector/lectures">Lectures</NavigationItem>
      </ul>
    </nav>
  </div>
);
