import Link from 'next/link';

import { Button } from '@/components/base/button';
import { query } from '@/db/query';
import { TextPreview } from '@/components/text-preview';

export const CurrentLecture = async () => {
	const availableLectures = await query.lectures.getAvailableLectures();
	const currentLecture = availableLectures.pop();

	if (!currentLecture) {
		return null;
	}

	return (
		<div className="px-6 py-4 bg-white border rounded-lg">
			<div className="flex items-center">
				<div className="grow">
					<span className="text-xs text-gray-500">Current lecture</span>
					<h3 className="-mt-1 text-xl truncate">{currentLecture.name}</h3>
				</div>

				<Link href={`/lectures/${currentLecture.slug}`}>
					<Button
						variant="primary/inverse"
						size="sm"
						iconLeft={{
							name: 'ArrowRight'
						}}
					/>
				</Link>
			</div>

			<TextPreview>{currentLecture.preview}</TextPreview>
		</div>
	);
};
