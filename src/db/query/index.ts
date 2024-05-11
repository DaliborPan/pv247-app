import { getNewStudentLectorId } from './lector';
import {
	getStudentsWithHomeworks,
	type GetStudentWithHomeworksResult
} from './student';

export const query = {
	lector: {
		getNewStudentLectorId
	},
	student: {
		getStudentsWithHomeworks
	}
};

export { type GetStudentWithHomeworksResult };
