import { UserRound } from 'lucide-react';
import { type ReactNode } from 'react';

export type ProjectTeamMember = {
  id: string;
  name: string;
};

export const ProjectTeamMembers = ({
  members,
  currentUserId,
  renderAction
}: {
  members: ProjectTeamMember[];
  currentUserId?: string;
  renderAction?: (member: ProjectTeamMember) => ReactNode;
}) => (
  <ul className="flex flex-col gap-2">
    {members.map(member => (
      <li
        key={member.id}
        className="flex items-center gap-3 rounded-lg bg-card p-4"
      >
        <UserRound aria-hidden="true" className="shrink-0" />
        <span className="min-w-0 grow break-words">
          {member.name}
          {member.id === currentUserId && ' (you)'}
        </span>
        {renderAction?.(member)}
      </li>
    ))}
  </ul>
);
