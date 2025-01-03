import Link from 'next/link';
import { ArrowRight, Plus, Users } from 'lucide-react';

import { Button } from '@/components/base/button';
import { SidebarCard } from '@/components/sidebar-card';
import { Icon } from '@/components/base/icon';
import { getMineProject } from '@/modules/session-user';

export const ProjectCard = async () => {
  const project = await getMineProject();

  return (
    <SidebarCard
      customTitle={
        <div className="flex items-center mb-4">
          <h3 className="text-xl grow">Project</h3>

          <Link href="/project">
            <Button
              variant="primary/inverse"
              size="sm"
              iconLeft={{ icon: project?.name ? <ArrowRight /> : <Plus /> }}
            />
          </Link>
        </div>
      }
    >
      {project?.name ? (
        <div className="flex flex-col gap-y-2">
          <span className="text-sm font-medium text-primary">
            {project.name}
          </span>

          <div className="flex items-center text-sm text-gray-600">
            {/* TODO: Icon based on if project is accepted or not */}
            <Icon icon={<Users />} className="mr-2" />
            <span className="truncate">{project.users.length} students</span>
          </div>
        </div>
      ) : (
        <span className="text-sm text-gray-600">
          Project not submitted yet.
        </span>
      )}
    </SidebarCard>
  );
};
