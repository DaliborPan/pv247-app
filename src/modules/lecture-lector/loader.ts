import { lectureLectorQueries } from './server';

const getLectorsForLectures = async () => {
  const lectureLectors = await lectureLectorQueries.getMany();

  return lectureLectors.reduce(
    (acc, currentLectureLector) => {
      if (!acc[currentLectureLector.lectureId])
        acc[currentLectureLector.lectureId] = [];
      acc[currentLectureLector.lectureId].push(currentLectureLector);
      return acc;
    },
    {} as Record<string, typeof lectureLectors>
  );
};

const getLectureLectors = async (lectureId: string) => {
  return lectureLectorQueries.getByLectureId(lectureId);
};

const getLectureApprovedLectors = async (lectureId: string) => {
  const lectureLectors = await lectureLectorQueries.getByLectureId(lectureId);

  return lectureLectors.filter(lectureLector => lectureLector.isApproved);
};

export const lectureLectorLoaders = {
  getLectorsForLectures,
  getLectureLectors,
  getLectureApprovedLectors
};
