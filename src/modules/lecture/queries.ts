import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { cache } from 'react';

import { db } from '@/db';
import { getSessionUser } from '@/modules/session-user/session-user';

import { lecturesTag } from './tag';
import { type LectureAttendanceType, type LectureType } from './types';

export const getLecturesCachedQuery = async (): Promise<LectureType[]> => {
  'use cache';
  cacheTag(lecturesTag);
  cacheLife('max');

  return db.query.lectures.findMany({
    columns: {
      id: true,
      name: true,
      availableFrom: true,
      slug: true,
      preview: true,
      isAvailable: true,
      homeworkName: true,
      homeworkSlug: true,
      homeworkPreview: true,
      homeworkClassroomLink: true,
      homeworkTemplateRepositoryUrl: true,
      homeworkMaxPoints: true,
      homeworkDeadline: true
    },
    orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)]
  });
};

export const getLectureByHomeworkSlugCachedQuery = cache(
  async (homeworkSlug: string) => {
    const lectures = await getLecturesCachedQuery();

    return lectures.find(lecture => lecture.homeworkSlug === homeworkSlug);
  }
);

export const getIsLectureAvailableCachedQuery = cache(async (slug: string) => {
  const lectures = await getLecturesCachedQuery();
  const lecture = lectures.find(lecture => lecture.slug === slug);

  if (!lecture) {
    throw new Error(`Lecture with slug ${slug} not found.`);
  }

  return lecture.isAvailable;
});

export const getIsHomeworkAvailableCachedQuery = cache(
  async (homeworkSlug: string) => {
    const lecture = await getLectureByHomeworkSlugCachedQuery(homeworkSlug);

    if (!lecture) {
      throw new Error(`Lecture with homework slug ${homeworkSlug} not found.`);
    }

    return lecture.isAvailable;
  }
);

export const getAvailableLecturesCachedQuery = cache(async () => {
  const lectures = await getLecturesCachedQuery();

  return lectures.filter(lecture => lecture.isAvailable);
});

export const getLecturesWithHomeworkCachedQuery = cache(async () => {
  const lectures = await getLecturesCachedQuery();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
});

export const getLecturesForAttendanceQuery = cache(
  async (): Promise<LectureAttendanceType[]> => {
    const sessionUser = await getSessionUser();

    if (sessionUser.role !== 'lector') {
      throw new Error('User not authorized');
    }

    return db.query.lectures.findMany({
      columns: { id: true, name: true, attendanceToken: true },
      orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)]
    });
  }
);
