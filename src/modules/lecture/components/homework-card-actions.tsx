'use client';

import Link from 'next/link';
import { LectureType } from '../schema';
import { checkIsAvailable } from '../utils/check-is-available';
import { cn } from '@/lib/cn';
import { Button } from '@/components/base/button';
import { NotepadText, Lock, ExternalLink } from 'lucide-react';

export const HomeworkCardActions = ({ lecture }: { lecture: LectureType }) => {
  const isAvailable = checkIsAvailable(lecture);

  return (
    <div className="flex grow gap-x-2">
      <Link
        href={`/homeworks/${lecture.homeworkSlug}`}
        className={cn('grow lg:grow-0', !isAvailable && 'pointer-events-none')}
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
  );
};
