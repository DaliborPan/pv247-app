import { db, type Lecture } from '..';

const getIsAvailable = (lecture: Lecture) =>
	new Date(lecture.availableFrom).getTime() < new Date().getTime();

export const getAvailableLectures = async () => {
	const lectures = await db.query.lectures.findMany({
		orderBy: (lectures, { asc }) => [asc(lectures.availableFrom)]
	});

	return lectures.filter(getIsAvailable);
};
