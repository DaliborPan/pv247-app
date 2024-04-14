import Link from 'next/link';

import { Button } from '@/components/base/button';
import { db, type Lecture } from '@/db';
import { Icon } from '@/components/base/icon';
import { TextPreview } from '@/components/text-preview';

const formatDate = (date: string) => {
	const d = new Date(date);

	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

const HomeworkCard = ({ lecture }: { lecture: Lecture; index: number }) => (
	<article className="p-6 bg-white rounded-lg shadow">
		<span className="flex items-center mb-1 text-xs text-gray-500">
			from {formatDate(lecture.availableFrom)}
		</span>

		<h2 className="text-xl font-medium">{lecture.homeworkName}</h2>

		<TextPreview className="mt-3 line-clamp-4">
			{lecture.homeworkPreview}
		</TextPreview>

		<div className="flex items-end justify-between mt-6">
			<Link href={`/lectures/${lecture.slug}`}>
				<Button size="sm">Open details</Button>
			</Link>

			<a
				href={lecture.homeworkClassroomLink}
				target="_blank"
				rel="noreferrer"
				className="flex items-center underline gap-x-2 text-primary underline-offset-2 hover:text-primary-800 hover:no-underline"
			>
				<Icon name="ExternalLink" />
				<span>Github Classroom Link</span>
			</a>
		</div>
	</article>
);

const Page = async () => {
	const lectures = await db.query.lectures.findMany();

	return (
		<>
			<h1 className="mb-6 text-3xl">Homeworks</h1>

			<div className="grid grid-cols-2 gap-6">
				{lectures.map((lecture, index) => (
					<HomeworkCard key={lecture.slug} lecture={lecture} index={index} />
				))}
			</div>
		</>
	);
};

export default Page;
