export const validateProjectTeamMemberIds = (teamMemberIds: string[]) => {
  if (teamMemberIds.length < 1 || teamMemberIds.length > 3) {
    return {
      success: false as const,
      message: 'Choose 1–3 different students.'
    };
  }

  if (new Set(teamMemberIds).size !== teamMemberIds.length) {
    return {
      success: false as const,
      message: 'Select each student only once.'
    };
  }

  return {
    success: true as const
  };
};
