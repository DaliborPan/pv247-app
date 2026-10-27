import { Calendar, Users } from 'lucide-react';

import { Badge } from '@/components/base/badge/badge';
import { Button } from '@/components/base/button/button';
import { Icon } from '@/components/base/icon/icon';
import { OverviewCard } from '@/components/overview-card';
import { formatDate } from '@/lib/date';
import { type ProjectType } from '@/modules/project/types';
import { getProjectStatusLabel } from '@/modules/project/utils/project-status';

export const ProjectCard = ({ project }: { project: ProjectType }) => (
  <OverviewCard>
    <OverviewCard.Meta className="truncate">
      <Icon icon={<Users />} className="mr-2" />
      {project.users
        .map(user => `${user.firstName} ${user.lastName}`)
        .join(', ')}
    </OverviewCard.Meta>

    <OverviewCard.Title>{project.name}</OverviewCard.Title>

    <OverviewCard.Description className="line-clamp-4">
      {project.shortDescription}
    </OverviewCard.Description>

    <OverviewCard.Footer className="flex-row items-end justify-between gap-2">
      <div className="grow">
        <Button href={`/lector/projects/${project.id}`} size="sm">
          Open project
        </Button>
      </div>

      <Badge variant="outline" className="text-text-secondary">
        <Icon icon={<Calendar />} className="mr-2" />
        {formatDate(project.updatedAt)}
      </Badge>

      <Badge variant="outline" className="text-text-secondary">
        {getProjectStatusLabel(project)}
      </Badge>
    </OverviewCard.Footer>
  </OverviewCard>
);
