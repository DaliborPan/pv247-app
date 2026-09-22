import { ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { Button } from '@/components/base/button/button';
import { Icon } from '@/components/base/icon/icon';
import { SidebarCard } from '@/components/sidebar-card';
import { getMyProjectQuery } from '@/modules/project/queries';

export const ProjectCard = () => (
  <SidebarCard
    className="hidden lg:block"
    customTitle={
      <div className="mb-4 flex items-center">
        <h3 className="grow text-xl">Project</h3>

        <Link href="/project">
          <Button
            variant="primary/inverse"
            size="sm"
            iconLeft={{ icon: <ArrowRight /> }}
          />
        </Link>
      </div>
    }
  >
    <Suspense>
      {getMyProjectQuery().then(project =>
        project ? (
          <div className="flex flex-col gap-y-2">
            <span className="font-medium text-text-primary-color">
              {project.name}
            </span>

            <div className="flex items-center text-text-secondary">
              {/* TODO: Icon based on if project is accepted or not */}
              <Icon icon={<Users />} className="mr-2" />
              <span className="truncate">{project.users.length} students</span>
            </div>
          </div>
        ) : (
          <span className="text-text-terciary">Project not submitted yet.</span>
        )
      )}
    </Suspense>
  </SidebarCard>
);
