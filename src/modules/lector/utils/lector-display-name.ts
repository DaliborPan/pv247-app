export const getLectorDisplayName = (lector: {
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
}) => {
  if (lector.firstName && lector.lastName) {
    return `${lector.firstName} ${lector.lastName}`;
  }

  return lector.name ?? 'Lektor';
};
