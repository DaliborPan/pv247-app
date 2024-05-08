import { getAvailableLectures, getOrderedLectures } from './lectures';
import { getNewStudentLectorId } from './lector';
import {
	getStudentsWithHomeworks,
	type GetStudentWithHomeworksResult
} from './student';

export const query = {
	lectures: {
		getAvailableLectures,
		getOrderedLectures
	},
	lector: {
		getNewStudentLectorId
	},
	student: {
		getStudentsWithHomeworks
	}
};

export { type GetStudentWithHomeworksResult };
