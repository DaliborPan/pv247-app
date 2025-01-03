'use server';

import { revalidateTag } from 'next/cache';

import { type Lecture } from '@/db';
import {
  getIsHomeworkAvailableTag,
  getIsLectureAvailableTag,
  ORDERED_LECTURES_TAG
} from '@/modules/lecture';

export const revalidateLectureAction = async (lecture: Lecture) => {
  revalidateTag(getIsLectureAvailableTag(lecture.slug));
  revalidateTag(getIsHomeworkAvailableTag(lecture.homeworkSlug));

  /**
   * TODO: should be changed to only propagate to places where needed
   */
  revalidateTag(ORDERED_LECTURES_TAG);
};
