import { getOrderedLectures } from '@/db/query/lectures';
import { LectureCard } from '@/modules/lecture/components';

const Page = async () => {
	const lectures = await getOrderedLectures();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{lectures.map((lecture, index) => (
				<LectureCard
					key={lecture.slug}
					lecture={lecture}
					index={index}
					href={`/lector/lectures/${lecture.slug}`}
				/>
			))}
		</div>
	);
};

export default Page;
