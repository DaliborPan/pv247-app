import { SidebarCard } from '@/components/sidebar-card';

import { SidebarCardRow } from './sidebar-card-row';

export const ProjectTimelineCard = () => (
  <SidebarCard title="Project timeline">
    <div className="flex flex-col gap-y-1">
      <SidebarCardRow title="Start thinking">28. 10.</SidebarCardRow>
      <SidebarCardRow title="Submit project spec.">11. 11.</SidebarCardRow>
      <SidebarCardRow title="Progress review">25/26. 11.</SidebarCardRow>
      <SidebarCardRow title="Presentation">9/10. 12.</SidebarCardRow>
    </div>
  </SidebarCard>
);
