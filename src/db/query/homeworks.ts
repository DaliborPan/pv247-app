import React from 'react';

import { db } from '..';

export const getUserHomeworks = React.cache((userId: string) =>
	db.query.homeworks.findMany({
		where: (table, { eq }) => eq(table.studentId, userId)
	})
);

export type GetUserHomeworksResult = Awaited<
	ReturnType<typeof getUserHomeworks>
>;
