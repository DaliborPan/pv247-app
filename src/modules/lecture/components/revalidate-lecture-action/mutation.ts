import { useMutation } from '@tanstack/react-query';

import { type Lecture } from '@/db';

import { revalidateLectureAction } from './action';

export const useRevalidateLectureMutation = (lecture: Lecture) =>
  useMutation({
    mutationFn: () => revalidateLectureAction(lecture)
  });
