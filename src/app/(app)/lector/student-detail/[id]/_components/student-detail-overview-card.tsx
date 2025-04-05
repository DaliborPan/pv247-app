import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { LabeledValue } from '@/components/labeled-value';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/base/icon';
import { StudentOverviewCard } from '@/modules/student/components/student-overview-card';
import { type UserType } from '@/modules/user/schema';

export const StudentDetailOverviewCard = ({
  student
}: {
  student: UserType;
}) => (
  <StudentOverviewCard
    user={student}
    otherFields={({ project: { project, display: projectDisplayName } }) => (
      <LabeledValue label="Project status">
        <Link
          className={cn(
            'flex items-center gap-x-2 transition-colors duration-200 hover:text-primary-500',
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
