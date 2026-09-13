import { SidebarCard } from '@/components/sidebar-card';

import { SidebarCardRow } from './sidebar-card-row';

export const ProjectTimelineCard = () => (
  <SidebarCard title="Project timeline">
    <div className="flex flex-col gap-y-1">
      <SidebarCardRow title="Start thinking">19. 10.</SidebarCardRow>
      <SidebarCardRow title="Submit project spec.">2. 11.</SidebarCardRow>
      <SidebarCardRow title="Progress review">17/18. 11.</SidebarCardRow>
      <SidebarCardRow title="Presentation">8/9. 12.</SidebarCardRow>
    </div>
  </SidebarCard>
);
