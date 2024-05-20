import { unstable_cache } from 'next/cache';
import React from 'react';

import { db, type LectureSlug, type Lecture, type HomeworkSlug } from '..';

export const getIsAvailable = (lecture: Lecture) =>
	new Date(lecture.availableFrom) < new Date();

/**
 * Available lectures
 */
export const getAvailableLectures = React.cache(async () => {
	const lectures = await getOrderedLectures();

	return lectures.filter(getIsAvailable);
});

/**
 * Is available lecture
 */
export const getIsLectureAvailableTag = (slug: LectureSlug) =>
	`is-lecture-available_${slug}`;

export const getIsLectureAvailable = (slug: LectureSlug) =>
	unstable_cache(
		async () => {
			const lecture = await db.query.lectures.findFirst({
				where: (table, { eq }) => eq(table.slug, slug)
			});

			return !!lecture && getIsAvailable(lecture);
		},
		[getIsLectureAvailableTag(slug)],
		{
			tags: [getIsLectureAvailableTag(slug)]
		}
	)();

/**
 * Is available homework
 */
export const getIsHomeworkAvailableTag = (slug: HomeworkSlug) =>
	`is-lecture-available_${slug}`;

export const getIsHomeworkAvailable = (slug: HomeworkSlug) =>
	unstable_cache(
		async () => {
			const lecture = await db.query.lectures.findFirst({
				where: (table, { eq }) => eq(table.homeworkSlug, slug)
			});

			return !!lecture && getIsAvailable(lecture);
		},
		[getIsHomeworkAvailableTag(slug)],
		{
			tags: [getIsHomeworkAvailableTag(slug)]
		}
	)();

/**
 * Ordered lectures
 */
export const ORDERED_LECTURES_TAG = 'ordered-lectures';

export const getOrderedLectures = unstable_cache(
	async () => {
		const lectures = await db.query.lectures.findMany({
			orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)],
			with: {
				homeworks: true
			}
		});

		return lectures;
	},
	[ORDERED_LECTURES_TAG],
	{
		tags: [ORDERED_LECTURES_TAG]
	}
);
