export const getHomeworkPointsMessage = ({
  points,
  hasGradingStarted
}: {
  points?: number | null;
  hasGradingStarted: boolean;
}) => {
  if (points != null) return `${points} points`;
  if (!hasGradingStarted) return "Grading hasn't started yet";

  return "Your submission hasn't been graded yet";
};
