import { LectureCard } from '@/modules/lecture/components';
import { getOrderedLectures } from '@/modules/lecture/server';
import { getIsAvailable } from '@/modules/lecture/utils';

const Page = async () => {
	const lectures = await getOrderedLectures();

	return (
		<>
			{lectures.map((lecture, index) => {
				const isAvailable = getIsAvailable(lecture);

				return (
					<LectureCard
						key={lecture.slug}
						lecture={lecture}
						index={index}
						isAvailable={isAvailable}
					/>
				);
			})}
		</>
	);
};

export default Page;
