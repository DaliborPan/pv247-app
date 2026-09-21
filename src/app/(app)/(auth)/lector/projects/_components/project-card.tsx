import { Calendar, Check, Users } from 'lucide-react';
import Link from 'next/link';

import { Icon } from '@/components/base/icon/icon';
import { TextPreview } from '@/components/text-preview';
import { Button } from '@/components/base/button/button';
import { Badge } from '@/components/base/badge/badge';
import { formatDate } from '@/lib/date';
import { type ProjectType } from '@/modules/project/types';
import { getProjectStatusLabel } from '@/modules/project/utils/project-status';

export const ProjectCard = ({
  project
}: {
  project: ProjectType;
}) => (
  <article className="flex flex-col rounded-lg bg-white p-6 shadow">
    <span className="mb-1 flex items-center truncate text-xs text-text-terciary">
      <Icon icon={<Users />} className="mr-2" />
      {project.users
        .map(user => `${user.firstName} ${user.lastName}`)
        .join(', ')}
    </span>

    <h2 className="text-xl font-medium">{project.name}</h2>

    <TextPreview className="mt-3 line-clamp-4 grow">
      {project.shortDescription}
    </TextPreview>

    <div className="mt-6 flex items-end justify-between gap-x-2">
      <Link href={`/lector/projects/${project.id}`} className="grow">
        <Button size="sm">Open project</Button>
      </Link>

      <Badge variant="outline" className="text-text-secondary">
        <Icon icon={<Calendar />} className="mr-2" />
        {formatDate(project.updatedAt)}
      </Badge>

      <Badge variant="outline" className="text-text-secondary">
        {getProjectStatusLabel(project)}
      </Badge>
    </div>
  </article>
);
