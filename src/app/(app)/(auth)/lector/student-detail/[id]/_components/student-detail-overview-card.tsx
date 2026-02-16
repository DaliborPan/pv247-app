import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { LabeledValue } from '@/components/labeled-value';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';
import { StudentOverviewCard } from '@/modules/student/components/student-overview-card';
import { type UserType } from '@/modules/user/schema';
import { getProjectStatusLabel } from '@/modules/project/utils/project-status';

export const StudentDetailOverviewCard = ({
  student
}: {
  student: Promise<UserType>;
}) => (
  <StudentOverviewCard
    user={student}
    otherFields={({ project }) => (
      <LabeledValue label="Project status">
        <Link
          className={cn(
            'flex items-center gap-x-2 transition-colors duration-200 hover:text-primary-500',
            !project?.id && 'pointer-events-none'
          )}
          href={`/lector/projects/${project?.id ?? ''}`}
        >
          <span className="block">{getProjectStatusLabel(project)}</span>

          {project?.id && <Icon icon={<ExternalLink />} />}
        </Link>
      </LabeledValue>
    )}
  />
);
