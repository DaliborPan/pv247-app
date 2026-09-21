export const getHomeworkPointsMessage = ({
  points,
  hasGradingStarted
}: {
  points?: number;
  hasGradingStarted: boolean;
}) => {
  if (points !== undefined) return `${points} points`;
  if (!hasGradingStarted) return "Grading hasn't started yet";

  return "Your submission hasn't been graded yet";
};
