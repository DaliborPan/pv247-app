import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { cache } from 'react';

import { db } from '@/db';
import { getSessionUser } from '@/modules/session-user';

import { lecturesTag } from './tag';
import { type LectureAttendanceType, type LectureType } from './types';

const readLectureCatalog = async (): Promise<LectureType[]> => {
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

export const getLecturesQuery = cache(readLectureCatalog);

export const getLectureByHomeworkSlugQuery = cache(async (homeworkSlug: string) => {
  const lectures = await getLecturesQuery();

  return lectures.find(lecture => lecture.homeworkSlug === homeworkSlug);
});

export const getIsLectureAvailableQuery = cache(async (slug: string) => {
  const lectures = await getLecturesQuery();
  const lecture = lectures.find(lecture => lecture.slug === slug);

  if (!lecture) {
    throw new Error(`Lecture with slug ${slug} not found.`);
  }

  return lecture.isAvailable;
});

export const getIsHomeworkAvailableQuery = cache(async (homeworkSlug: string) => {
  const lecture = await getLectureByHomeworkSlugQuery(homeworkSlug);

  if (!lecture) {
    throw new Error(`Lecture with homework slug ${homeworkSlug} not found.`);
  }

  return lecture.isAvailable;
});

export const getAvailableLecturesQuery = cache(async () => {
  const lectures = await getLecturesQuery();

  return lectures.filter(lecture => lecture.isAvailable);
});

export const getLecturesWithHomeworkQuery = cache(async () => {
  const lectures = await getLecturesQuery();

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
