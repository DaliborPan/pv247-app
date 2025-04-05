import Image from 'next/image';
import Link from 'next/link';
import { Github, LogOut } from 'lucide-react';

import { cn } from '@/lib/cn';
import { Button } from '@/components/base/button';
import { type UserType } from '@/modules/user/schema';

import MUNI_LOGO from '../../../public/muni-logo.png';
import { SignIn } from '../sign-in';

import { NavigationItem } from './navigation-item';
import { MobileNavigation } from './mobile-navigation';
import { Logout } from './logout';

const NavigationDelimiter = ({ className }: { className?: string }) => (
  <div className={cn('mx-6 h-5 w-[2px] bg-[#B9BBC6]', className)} />
);

const UserMenuItem = ({ user }: { user: UserType }) => (
  <Link href="/profile" className="flex items-center gap-x-3">
    <div className="size-8 rounded-full bg-neutral" />

    <span>{user.name}</span>
  </Link>
);

export const Navigation = ({
  user,
  isUserLoading = false
}: {
  user?: UserType;
  isUserLoading?: boolean;
}) => (
  <header className="sticky top-0 z-20 border-b bg-white py-2 md:px-10 lg:px-4">
    <div className="container flex items-center gap-x-20 lg:w-full">
      <Image src={MUNI_LOGO} width={100} alt="muni-logo" />

      <MobileNavigation user={user} isUserLoading={isUserLoading} />

      <div className="hidden grow items-center lg:flex">
        <nav className="grow">
          <ul className="flex items-center gap-x-10">
            <NavigationItem href="/">Home</NavigationItem>
            <NavigationItem href="/lectures">Lectures</NavigationItem>
            <NavigationItem href="/homeworks">Homeworks</NavigationItem>

            {user?.role === 'lector' && (
              <NavigationItem href="/lector/students">Lector</NavigationItem>
            )}

            {user?.role === 'student' && (
              <NavigationItem href="/project">Project</NavigationItem>
            )}
          </ul>
        </nav>

        {isUserLoading ? null : user ? (
          <div className="flex items-center">
            <UserMenuItem user={user} />
            <NavigationDelimiter className="mr-4" />
            <Logout>
              <Button
                iconLeft={{ icon: <LogOut /> }}
                variant="ghost"
                size="sm"
              />
            </Logout>
          </div>
        ) : (
          <SignIn>
            <Button
              size="sm"
              variant="outline/primary"
              iconLeft={{ icon: <Github /> }}
            >
              Sign in
            </Button>
          </SignIn>
        )}
      </div>
    </div>
  </header>
);
