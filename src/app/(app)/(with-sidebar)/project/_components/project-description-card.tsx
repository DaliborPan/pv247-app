import { RichTextEditor } from '@/components/base/rich-text-editor';
import { DetailCard } from '@/components/detail-card';

export const ProjectDescriptionCard = ({
  description
}: {
  description: string;
}) => (
  <DetailCard title="Description">
    <RichTextEditor value={description} disabled />
  </DetailCard>
);
