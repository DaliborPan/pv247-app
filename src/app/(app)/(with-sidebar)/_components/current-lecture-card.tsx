import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/base/button';
import { TextPreview } from '@/components/text-preview';
import { lectureLoaders } from '@/modules/lecture/loader';
import { Suspense } from 'react';

export const CurrentLectureCard = () => {
  const currentLecturePromise = lectureLoaders
    .getAvailable()
    .then(availableLectures => availableLectures.pop());

  return (
    <Suspense>
      {currentLecturePromise.then(
        currentLecture =>
          currentLecture && (
            <div className="rounded-lg border bg-white px-6 py-4">
              <div className="flex flex-col lg:flex-row lg:items-center">
                <div className="grow truncate">
                  <span className="mb-1 text-xs text-text-terciary">
                    Current lecture
                  </span>

                  <h3 className="truncate text-xl">{currentLecture.name}</h3>
                </div>

                <Link href={`/lectures/${currentLecture.slug}`}>
                  <Button
                    variant="link"
                    size="sm"
                    iconRight={{ icon: <ArrowRight /> }}
                  >
                    Learn more
                  </Button>
                </Link>
              </div>

              <TextPreview>{currentLecture.preview}</TextPreview>
            </div>
          )
      )}
    </Suspense>
  );
};
