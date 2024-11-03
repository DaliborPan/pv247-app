import { Calendar, Check, Users } from 'lucide-react';
import Link from 'next/link';

import { Icon } from '@/components/base/icon';
import { type GetProjectsResult } from '@/modules/project';
import { TextPreview } from '@/components/text-preview';
import { Button } from '@/components/base/button';
import { Badge } from '@/components/base/badge';
import { formatDate } from '@/lib/date';

export const ProjectCard = ({
  project
}: {
  project: GetProjectsResult[number];
}) => (
  <article className="p-6 bg-white rounded-lg shadow">
    <span className="flex items-center mb-1 text-xs text-gray-500 truncate">
      <Icon icon={<Users />} className="mr-2" />
      {project.users
        .map(user => `${user.firstName} ${user.lastName}`)
        .join(', ')}
    </span>

    <h2 className="text-xl font-medium">{project.name}</h2>

    <TextPreview className="mt-3 line-clamp-4">
      {project.description}
    </TextPreview>

    <div className="flex items-end justify-between mt-6 gap-x-2">
      <Link href={`/lector/projects/${project.id}`} className="grow">
        <Button size="sm">Open project</Button>
      </Link>

      <Badge variant="outline" className="text-gray-600">
        <Icon icon={<Calendar />} className="mr-2" />
        {formatDate(project.updatedAt)}
      </Badge>

      {project.status === 'submitted' && project.points ? (
        <Badge className="flex items-center gap-x-1.5">
          <Icon icon={<Check />} />
          {project.points} points
        </Badge>
      ) : (
        <Badge variant="outline" className="text-gray-600">
          {project.status}
        </Badge>
      )}
    </div>
  </article>
);
