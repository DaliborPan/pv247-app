export const getHomeworkTag = ({
  userId,
  lectureId
}: {
  userId?: string;
  lectureId?: string;
}) => {
  if (userId) {
    return `homework:${userId}`;
  }
  if (lectureId) {
    return `lecture-homeworks:${lectureId}`;
  }

  return `homework:${userId}`;
};
