import Link from 'next/link';

import { Button } from '@/components/base/button';
import { type Lecture } from '@/db';
import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';
import { TextPreview } from '@/components/text-preview';
import { formatDate } from '@/lib/date';
import { getIsAvailable, getOrderedLectures } from '@/db/query/lectures';
import { cn } from '@/lib/cn';

const getNumberWithOrdinal = (num: number) => {
	const s = ['th', 'st', 'nd', 'rd'];
	const value = num % 100;

	return num + (s[(value - 20) % 10] || s[value] || s[0]);
};

const LectureCard = ({
	lecture,
	index
}: {
	lecture: Lecture;
	index: number;
}) => {
	const isAvailable = getIsAvailable(lecture);

	return (
		<article className="flex flex-col p-6 bg-white rounded-lg shadow">
			<span className="flex items-center mb-1 text-xs text-gray-500">
				from {formatDate(lecture.availableFrom)}
			</span>

			<h2 className="text-xl font-medium">{lecture.name}</h2>

			<TextPreview className="mt-3 line-clamp-5 grow">
				{lecture.preview}
			</TextPreview>

			<div className="flex items-end justify-between mt-6">
				<Link
					href={`/lectures/${lecture.slug}`}
					className={cn(!isAvailable && 'pointer-events-none')}
				>
					<Button
						iconLeft={
							!isAvailable
								? {
										name: 'Lock'
									}
								: undefined
						}
						disabled={!isAvailable}
						size="sm"
					>
						Open lecture
					</Button>
				</Link>

				<Badge variant="outline" className="text-gray-600">
					<Icon name="Layers" className="mr-2" />
					{getNumberWithOrdinal(index + 1)} week
				</Badge>
			</div>
		</article>
	);
};

const Page = async () => {
	const lectures = await getOrderedLectures();

	return (
		<>
			{lectures.map((lecture, index) => (
				<LectureCard key={lecture.slug} lecture={lecture} index={index} />
			))}
		</>
	);
};

export default Page;
