import Link from 'next/link';

import { Button } from '@/components/base/button';
import { db, type Lecture } from '@/db';
import { Badge } from '@/components/base/badge/badge';
import { Icon } from '@/components/base/icon';

const formatDate = (date: string) => {
	const d = new Date(date);

	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

const LectureCard = ({ lecture }: { lecture: Lecture }) => {
	console.log(lecture);

	return (
		<div className="p-6 bg-white rounded-lg shadow">
			<h2 className="text-xl font-medium">{lecture.name}</h2>

			<p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-4">
				{lecture.preview}
			</p>

			<div className="flex items-end justify-between mt-6">
				<Link href={`/lectures/${lecture.slug}`}>
					<Button size="sm">Open lecture</Button>
				</Link>

				<Badge variant="outline">
					<Icon name="Clock" className="mr-2" />
					{formatDate(lecture.availableFrom)}
				</Badge>
			</div>
		</div>
	);
};

const Page = async () => {
	const lectures = await db.query.lectures.findMany();

	return (
		<>
			<h1 className="mb-6 text-3xl">Lectures</h1>

			<div className="grid grid-cols-2 gap-6">
				{lectures.map(lecture => (
					<LectureCard key={lecture.slug} lecture={lecture} />
				))}
			</div>
		</>
	);
};

export default Page;
