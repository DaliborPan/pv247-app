import { User } from 'lucide-react';

import { Icon } from '@/components/base/icon';
import { SidebarCard } from '@/components/sidebar-card';
import { type GetProjectResult } from '@/modules/project';

export const ProjectUsersCard = ({
  project
}: {
  project: NonNullable<GetProjectResult>;
}) => (
  <SidebarCard title="Users">
    <ul className="text-primary font-medium flex flex-col gap-y-1.5">
      {project.users.map(user => (
        <li key={user.id} className="flex items-center gap-x-2">
          <Icon icon={<User />} />
          <span>{user.name}</span>
        </li>
      ))}
    </ul>
  </SidebarCard>
);
