import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/base/button';
import { TextPreview } from '@/components/text-preview';
import { getAvailableLectures } from '@/modules/lecture/server';

export const CurrentLectureCard = async () => {
  const availableLectures = await getAvailableLectures();
  const currentLecture = availableLectures.pop();

  if (!currentLecture) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-white px-6 py-4">
      <div className="flex items-center">
        <div className="grow">
          <span className="text-xs text-gray-500">Current lecture</span>
          <h3 className="-mt-1 truncate text-xl">{currentLecture.name}</h3>
        </div>

        <Link href={`/lectures/${currentLecture.slug}`}>
          <Button
            variant="primary/inverse"
            size="sm"
            iconLeft={{ icon: <ArrowRight /> }}
          />
        </Link>
      </div>

      <TextPreview>{currentLecture.preview}</TextPreview>
    </div>
  );
};
