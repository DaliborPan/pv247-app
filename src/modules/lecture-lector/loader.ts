import { getSessionUser } from '../session-user';
import { lectureLectorQueries } from './server';

const getLectorsForLectures = async () => {
  const sessionUser = await getSessionUser();
  const lectureLectors = await lectureLectorQueries.getMany({ sessionUser });

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
  const sessionUser = await getSessionUser();
  const lectureLectors = await lectureLectorQueries.getMany({ sessionUser });

  return lectureLectors.filter(
    lectureLector => lectureLector.lectureId === lectureId
  );
};

export const lectureLectorLoaders = {
  getLectorsForLectures,
  getLectureLectors
};
