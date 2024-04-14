'use server';

import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';

import { db, homeworks } from '@/db';

import { type SetHomeworkPointsFormSchema } from './schema';

export const setHomeworkPointsAction = async ({
	lecture,
	lectorId,
	studentId,
	points,
	isCreating
}: SetHomeworkPointsFormSchema & {
	isCreating: boolean;
}) => {
	if (isCreating) {
		await db.insert(homeworks).values({
			name: lecture.homeworkName,
			points,
			studentId,
			lectureId: lecture.id,
			lectorId
		});
	} else {
		await db
			.update(homeworks)
			.set({
				points
			})
			.where(
				and(
					eq(homeworks.lectureId, lecture.id),
					eq(homeworks.studentId, studentId)
				)
			);
	}

	revalidatePath('/lector/homeworks');
};
