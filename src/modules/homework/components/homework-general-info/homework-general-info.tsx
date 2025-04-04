import { type HomeworkSlug } from '@/db';
import { getLecturesWithHomeworkLoader } from '@/modules/lecture/loader';

import { PersonHomeworkDeadline } from './person-homework-deadline';
import { LabeledItem } from './labeled-item';
import { HomeworkPoints } from './homework-points';

export const HomeworkGeneralInfo = async ({ slug }: { slug: HomeworkSlug }) => {
  const lectures = await getLecturesWithHomeworkLoader();
  const lecture = lectures.find(lecture => lecture.homeworkSlug === slug);

  if (!lecture) return null;

  return (
    <div className="mt-8 grid items-center gap-4 rounded-lg bg-primary-100 p-4 lg:grid-cols-4 lg:gap-10">
      <div className="grow">
        <LabeledItem label="Maximum points">
          {lecture?.homeworkMaxPoints} points
        </LabeledItem>
      </div>

      <div className="col-span-2">
        <LabeledItem label="Deadline">
          <PersonHomeworkDeadline lecture={lecture} />
        </LabeledItem>
      </div>

      <div>
        <HomeworkPoints lecture={lecture} />
      </div>
    </div>
  );
};
