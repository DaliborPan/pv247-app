import { RichTextEditor } from '@/components/base/rich-text-editor/rich-text-editor';
import { OverviewCard } from '@/components/overview-card';

export const ProjectDescriptionCard = ({
  description
}: {
  description: string;
}) => (
  <OverviewCard>
    <OverviewCard.Title>Description</OverviewCard.Title>
    <div className="mt-4 min-w-0">
      <RichTextEditor value={description} disabled />
    </div>
  </OverviewCard>
);
