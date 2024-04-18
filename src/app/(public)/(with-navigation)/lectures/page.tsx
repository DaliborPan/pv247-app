import Link from 'next/link';

import { Button } from '@/components/base/button';
import { db, type Lecture } from '@/db';
import { Badge } from '@/components/base/badge';
import { Icon } from '@/components/base/icon';
import { TextPreview } from '@/components/text-preview';
import { formatDate } from '@/lib/date';

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
}) => (
	<article className="p-6 bg-white rounded-lg shadow">
		<span className="flex items-center mb-1 text-xs text-gray-500">
			from {formatDate(lecture.availableFrom)}
		</span>

		<h2 className="text-xl font-medium">{lecture.name}</h2>

		<TextPreview className="mt-3 line-clamp-4">{lecture.preview}</TextPreview>

		<div className="flex items-end justify-between mt-6">
			<Link href={`/lectures/${lecture.slug}`}>
				<Button size="sm">Open lecture</Button>
			</Link>

			<Badge variant="outline" className="text-gray-600">
				<Icon name="Layers" className="mr-2" />
				{getNumberWithOrdinal(index + 1)} week
			</Badge>
		</div>
	</article>
);

const Page = async () => {
	const lectures = await db.query.lectures.findMany();

	return (
		<>
			{lectures.map((lecture, index) => (
				<LectureCard key={lecture.slug} lecture={lecture} index={index} />
			))}
		</>
	);
};

export default Page;
