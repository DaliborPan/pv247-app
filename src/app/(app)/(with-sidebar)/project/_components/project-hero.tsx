import Link from 'next/link';
import { Github, Pencil, Users } from 'lucide-react';

import { Button } from '@/components/base/button';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';
import { Hero } from '@/components/base/hero';
import { getMineProjectLoader } from '@/modules/session-user/loader';

const GithubLink = ({ href }: { href?: string | null }) => (
  <a
    href={href ?? ''}
    target="_blank"
    rel="noreferrer"
    className={cn(!href && 'pointer-events-none')}
  >
    <Button
      size="sm"
      variant="outline"
      iconLeft={{ icon: <Github /> }}
      disabled={!href}
    />
  </a>
);

const EditLink = ({ disabled }: { disabled: boolean }) => (
  <Link href="/project/edit" className={cn(disabled && 'pointer-events-none')}>
    <Button
      disabled={disabled}
      size="sm"
      variant="outline"
      iconLeft={{ icon: <Pencil /> }}
    />
  </Link>
);

export const ProjectHero = async () => {
  const project = await getMineProjectLoader();

  if (!project) return null;

  const displayUsers = project.users
    .map(user => `${user.firstName} ${user.lastName}`)
    .join(', ');

  return (
    <Hero
      actions={
        <>
          <GithubLink href={project.github} />
          <EditLink disabled={project.status === 'submitted'} />
        </>
      }
    >
      <div className="size-20 rounded-full bg-gradient-to-tr from-primary-500 to-primary-100 shadow" />

      <div>
        <div className="text-2xl font-medium">{project.name}</div>
        <div className="mt-1 flex items-center gap-x-2">
          <Icon icon={<Users />} />
          <div className="text-sm text-text-terciary">{displayUsers}</div>
        </div>
      </div>
    </Hero>
  );
};
