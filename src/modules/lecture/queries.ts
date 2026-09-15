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

export const getLectures = cache(readLectureCatalog);

export const getLectureByHomeworkSlug = cache(async (homeworkSlug: string) => {
  const lectures = await getLectures();

  return lectures.find(lecture => lecture.homeworkSlug === homeworkSlug);
});

export const getIsLectureAvailable = cache(async (slug: string) => {
  const lectures = await getLectures();
  const lecture = lectures.find(lecture => lecture.slug === slug);

  if (!lecture) {
    throw new Error(`Lecture with slug ${slug} not found.`);
  }

  return lecture.isAvailable;
});

export const getIsHomeworkAvailable = cache(async (homeworkSlug: string) => {
  const lecture = await getLectureByHomeworkSlug(homeworkSlug);

  if (!lecture) {
    throw new Error(`Lecture with homework slug ${homeworkSlug} not found.`);
  }

  return lecture.isAvailable;
});

export const getAvailableLectures = cache(async () => {
  const lectures = await getLectures();

  return lectures.filter(lecture => lecture.isAvailable);
});

export const getLecturesWithHomework = cache(async () => {
  const lectures = await getLectures();

  return lectures.filter(lecture => !!lecture.homeworkSlug);
});

export const getLecturesForAttendance = cache(
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
