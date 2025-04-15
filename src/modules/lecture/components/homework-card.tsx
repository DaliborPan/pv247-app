import Link from 'next/link';
import { NotepadText, Lock, ExternalLink } from 'lucide-react';

import { formatDate } from '@/lib/date';
import { TextPreview } from '@/components/text-preview';
import { Button } from '@/components/base/button';
import { cn } from '@/lib/cn';

import { checkIsAvailable } from '../utils/check-is-available';
import { type LectureType } from '../schema';

import { HomeworkPointsBadge } from './homework-points-badge';

export const HomeworkCard = ({
  lecture
}: {
  lecture: LectureType;
  index: number;
}) => {
  const isAvailable = checkIsAvailable(lecture);

  return (
    <article className="flex flex-col rounded-lg bg-white p-6 shadow">
      <span className="mb-1 flex items-center text-xs text-text-terciary">
        from {formatDate(lecture.availableFrom)}
      </span>

      <h2 className="text-xl font-medium">{lecture.homeworkName}</h2>

      <TextPreview className="mt-3 line-clamp-5 grow">
        {lecture.homeworkPreview}
      </TextPreview>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex grow gap-x-2">
          <Link
            href={`/homeworks/${lecture.homeworkSlug}`}
            className={cn(
              'grow lg:grow-0',
              !isAvailable && 'pointer-events-none'
            )}
          >
            <Button
              size="sm"
              className="w-full lg:w-auto"
              iconLeft={{ icon: !isAvailable ? <Lock /> : <NotepadText /> }}
              disabled={!isAvailable}
            >
              Learn more
            </Button>
          </Link>

          {isAvailable && (
            <a
              href={lecture.homeworkClassroomLink}
              target="_blank"
              rel="noreferrer"
              className="grow lg:grow-0"
            >
              <Button
                size="sm"
                className="w-full lg:w-auto"
                iconLeft={{ icon: <ExternalLink /> }}
                variant="outline/primary"
              >
                GH classroom
              </Button>
            </a>
          )}
        </div>

        <div>
          <HomeworkPointsBadge
            maxPoints={lecture.homeworkMaxPoints}
            lectureId={lecture.id}
          />
        </div>
      </div>
    </article>
  );
};
