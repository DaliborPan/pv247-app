import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { LabeledValue } from '@/components/labeled-value';
import { StudentOverviewCard as _StudentOverviewCard } from '@/modules/student';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';
import { type User } from '@/db';

export const StudentOverviewCard = ({ student }: { student: User }) => (
  <_StudentOverviewCard
    userId={student.id}
    projectId={student.projectId}
    otherFields={({ project: { project, display: projectDisplayName } }) => (
      <LabeledValue label="Project status">
        <Link
          className={cn(
            'flex items-center transition-colors duration-200 gap-x-2 hover:text-primary-500',
            !project?.id && 'pointer-events-none'
          )}
          href={`/lector/projects/${project?.id ?? ''}`}
        >
          <span className="block">{projectDisplayName}</span>

          {project?.id && <Icon icon={<ExternalLink />} />}
        </Link>
      </LabeledValue>
    )}
  />
);
