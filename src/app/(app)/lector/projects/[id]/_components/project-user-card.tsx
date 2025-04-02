import { User } from 'lucide-react';

import { Icon } from '@/components/base/icon';
import { SidebarCard } from '@/components/sidebar-card';
import { type GetProjectsLoaderResult } from '@/modules/project/loader';

export const ProjectUsersCard = ({
  project
}: {
  project: GetProjectsLoaderResult[number];
}) => (
  <SidebarCard title="Users">
    <ul className="flex flex-col gap-y-1.5 font-medium text-primary">
      {project.users.map(user => (
        <li key={user.id} className="flex items-center gap-x-2">
          <Icon icon={<User />} />
          <span>{user.name}</span>
        </li>
      ))}
    </ul>
  </SidebarCard>
);
