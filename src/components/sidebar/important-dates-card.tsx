import { SidebarCard } from '../sidebar-card';

import { SidebarCardRow } from './sidebar-card-row';

export const ProjectTimelineCard = () => (
  <SidebarCard title="Project timeline">
    <div className="flex flex-col gap-y-1">
      <SidebarCardRow title="Start thinking">24. 3.</SidebarCardRow>
      <SidebarCardRow title="Submit project spec.">7. 4.</SidebarCardRow>
      <SidebarCardRow title="Progress review">23/24. 4.</SidebarCardRow>
      <SidebarCardRow title="Presentation">13/14. 5.</SidebarCardRow>
    </div>
  </SidebarCard>
);
