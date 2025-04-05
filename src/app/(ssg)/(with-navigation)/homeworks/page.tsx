import { getLecturesWithHomeworkLoader } from '@/modules/lecture/loader';
import { HomeworkCard } from '@/modules/lecture/components/homework-card';

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
