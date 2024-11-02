import Link from 'next/link';
import { ExternalLink, Lock } from 'lucide-react';

import { Button } from '@/components/base/button';
import { type Lecture } from '@/db';
import { Icon } from '@/components/base/icon';
import { TextPreview } from '@/components/text-preview';
import { getIsAvailable, getOrderedLectures } from '@/db/query/lectures';
import { cn } from '@/lib/cn';

const formatDate = (date: string) => {
	const d = new Date(date);

	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

const HomeworkCard = ({ lecture }: { lecture: Lecture; index: number }) => {
	const isAvailable = getIsAvailable(lecture);

	return (
		<article className="flex flex-col p-6 bg-white rounded-lg shadow">
			<span className="flex items-center mb-1 text-xs text-gray-500">
				from {formatDate(lecture.availableFrom)}
			</span>

			<h2 className="text-xl font-medium">{lecture.homeworkName}</h2>

			<TextPreview className="mt-3 line-clamp-5 grow">
				{lecture.homeworkPreview}
			</TextPreview>

			<div className="flex items-end justify-between mt-6">
				<Link
					href={`/homeworks/${lecture.homeworkSlug}`}
					className={cn(!isAvailable && 'pointer-events-none')}
				>
					<Button
						size="sm"
						iconLeft={
							!isAvailable
								? {
										icon: <Lock />
									}
								: undefined
						}
						disabled={!isAvailable}
					>
						Open details
					</Button>
				</Link>

				<a
					href={lecture.homeworkClassroomLink}
					target="_blank"
					rel="noreferrer"
					className="flex items-center underline gap-x-2 text-primary underline-offset-2 hover:text-primary-800 hover:no-underline"
				>
					<Icon icon={<ExternalLink />} />
					<span>Github Classroom Link</span>
				</a>
			</div>
		</article>
	);
};

const Page = async () => {
	const lectures = await getOrderedLectures();

	return (
		<>
			{lectures
				.filter(lecture => lecture.homeworkSlug !== '')
				.map((lecture, index) => (
					<HomeworkCard key={lecture.slug} lecture={lecture} index={index} />
				))}
		</>
	);
};

export default Page;
