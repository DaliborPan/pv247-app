import { SidebarCard } from '@/components/sidebar-card';

import { SidebarCardRow } from './sidebar-card-row';

export const ProjectTimelineCard = () => (
  <SidebarCard title="Project timeline">
    <div className="flex flex-col gap-y-1">
      <SidebarCardRow title="Start thinking">23. 3.</SidebarCardRow>
      <SidebarCardRow title="Submit project spec.">6. 4.</SidebarCardRow>
      <SidebarCardRow title="Progress review">21/22. 4.</SidebarCardRow>
      <SidebarCardRow title="Presentation">28/29. 4.</SidebarCardRow>
    </div>
  </SidebarCard>
);
