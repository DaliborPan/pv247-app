import Link from 'next/link';
import { Layers, Lock } from 'lucide-react';

import { Badge } from '@/components/base/badge';
import { Button } from '@/components/base/button';
import { Icon } from '@/components/base/icon';
import { TextPreview } from '@/components/text-preview';
import { type Lecture } from '@/db';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/date';

const getNumberWithOrdinal = (num: number) => {
	const s = ['th', 'st', 'nd', 'rd'];
	const value = num % 100;

	return num + (s[(value - 20) % 10] || s[value] || s[0]);
};

export const LectureCard = ({
	lecture,
	index,
	isAvailable = true,
	href = `/lectures/${lecture.slug}`
}: {
	lecture: Lecture;
	index: number;
	isAvailable?: boolean;
	href?: string;
}) => (
	<article className="flex flex-col p-6 bg-white rounded-lg shadow">
		<span className="flex items-center mb-1 text-xs text-gray-500">
			from {formatDate(lecture.availableFrom)}
		</span>

		<h2 className="text-xl font-medium">{lecture.name}</h2>

		<TextPreview className="mt-3 line-clamp-5 grow">
			{lecture.preview}
		</TextPreview>

		<div className="flex items-end justify-between mt-6">
			<Link href={href} className={cn(!isAvailable && 'pointer-events-none')}>
				<Button
					iconLeft={!isAvailable ? { icon: <Lock /> } : undefined}
					disabled={!isAvailable}
					size="sm"
				>
					Open lecture
				</Button>
			</Link>

			<Badge variant="outline" className="text-gray-600">
				<Icon icon={<Layers />} className="mr-2" />
				{getNumberWithOrdinal(index + 1)} week
			</Badge>
		</div>
	</article>
);
