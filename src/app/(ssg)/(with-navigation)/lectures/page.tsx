import { getIsAvailable, getOrderedLectures } from '@/db/query/lectures';
import { LectureCard } from '@/modules/lecture/components';

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
