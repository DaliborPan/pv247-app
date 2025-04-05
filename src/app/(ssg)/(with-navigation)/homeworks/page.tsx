import Link from 'next/link';
import { ExternalLink, Lock } from 'lucide-react';

import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { TextPreview } from '@/components/text-preview';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/date';
import { checkIsAvailable } from '@/modules/lecture/utils/check-is-available';
import { getLecturesWithHomeworkLoader } from '@/modules/lecture/loader';
import { type LectureType } from '@/modules/lecture/schema';

const HomeworkCard = ({ lecture }: { lecture: LectureType; index: number }) => {
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

      <div className="mt-6 flex items-center justify-between lg:items-end">
        <Link
          href={`/homeworks/${lecture.homeworkSlug}`}
          className={cn(!isAvailable && 'pointer-events-none')}
        >
          <Button
            size="sm"
            iconLeft={!isAvailable ? { icon: <Lock /> } : undefined}
            disabled={!isAvailable}
          >
            Open details
          </Button>
        </Link>

        {isAvailable && (
          <a
            href={lecture.homeworkClassroomLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-x-2 text-text-primary-color underline underline-offset-2 hover:no-underline"
          >
            <Icon icon={<ExternalLink />} />
            <span className="hidden lg:inline-block">
              Github Classroom Link
            </span>
            <span className="lg:hidden">GH classroom</span>
          </a>
        )}
      </div>
    </article>
  );
};

const Page = async () => {
  const lectures = await getLecturesWithHomeworkLoader();

  return (
    <>
      {lectures.map((lecture, index) => (
        <HomeworkCard key={lecture.slug} lecture={lecture} index={index} />
      ))}
    </>
  );
};

export default Page;
