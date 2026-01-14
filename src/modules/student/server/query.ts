import { type SessionUserType } from '@/modules/session-user/types';

import { getProjectFormStudents, studentRepository } from './repository';
import { homeworkRepository } from '@/modules/homework/server/repository';

export const getProjectFormStudentComboboxOptions = async (
  sessionUser: SessionUserType,
  projectId: string | undefined
) => getProjectFormStudents(sessionUser, projectId);

const getMany = (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  return studentRepository.getManyStudents();
};

const getManyWithHomework = (
  sessionUser: SessionUserType,
  {
    lectureId
  }: {
    lectureId?: string;
  } = {}
) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  return studentRepository.getManyStudentsWithHomework({ lectureId });
};

const listStudents = async (sessionUser: SessionUserType) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  const students = await studentRepository.listStudents();

  return students
    .map(student => ({
      ...student,
      homeworkPoints: student.homeworksStudent.reduce(
        (acc, hw) => acc + hw.points,
        0
      ),
      attendanceCount: student.studentLectures.length
    }))
    .map(student => ({
      ...student,
      hasEnoughHomeworkPoints: student.homeworkPoints >= 130,
      hasEnoughAttendance: student.attendanceCount >= 8
      // hasProjectCompleted: student.project?.status === 'approved'
    }));
};

const get = async (sessionUser: SessionUserType, studentId: string) => {
  if (sessionUser.role !== 'lector') {
    throw new Error(`Unauthorized`);
  }

  const [students, homeworks] = await Promise.all([
    studentRepository.getManyStudents(),
    homeworkRepository.getMany({ userId: studentId })
  ]);

  const student = students.find(student => student.id === studentId);

  if (!student) {
    throw new Error(`Student ${studentId} not found`);
  }

  return {
    ...student,
    homeworksStudent: homeworks
  };
};

export const studentQueries = {
  getProjectFormStudentComboboxOptions,
  getMany,
  getManyWithHomework,
  get,
  listStudents
};
