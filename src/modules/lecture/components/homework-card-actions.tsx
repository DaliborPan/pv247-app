'use client';

import Link from 'next/link';
import { LectureType } from '../schema';

import { cn } from '@/lib/cn';
import { Button } from '@/components/base/button';
import { NotepadText, Lock, ExternalLink } from 'lucide-react';

export const HomeworkCardActions = ({ lecture }: { lecture: LectureType }) => {
  return (
    <div className="flex grow gap-x-2">
      <Link
        href={`/homeworks/${lecture.homeworkSlug}`}
        className={cn(
          'grow lg:grow-0',
          !lecture.isAvailable && 'pointer-events-none'
        )}
      >
        <Button
          size="sm"
          className="w-full lg:w-auto"
          iconLeft={{ icon: !lecture.isAvailable ? <Lock /> : <NotepadText /> }}
          disabled={!lecture.isAvailable}
        >
          Learn more
        </Button>
      </Link>

      {lecture.isAvailable && (
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
