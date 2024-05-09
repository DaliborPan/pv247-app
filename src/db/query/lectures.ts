// import { unstable_cache } from 'next/cache';

import { db, type Lecture } from '..';

export const getIsAvailable = (lecture: Lecture) =>
	new Date(lecture.availableFrom).getTime() < new Date().getTime();

export const getAvailableLectures = async () => {
	const lectures = await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)]
	});

	return lectures.filter(getIsAvailable);
};

// {
// 	revalidate: 60 * 60 * 24 // one day
// }

// export const getAvailableLectures = unstable_cache(
// 	async () => {
// 		const lectures = await db.query.lectures.findMany({
// 			orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)]
// 		});

// 		return lectures.filter(getIsAvailable);
// 	},
// 	['available-lectures']
// 	// {
// 	// 	revalidate: 60 * 60 * 24 // one day
// 	// }
// );

export const getOrderedLectures = async () => {
	const lectures = await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)]
	});

	return lectures;
};
