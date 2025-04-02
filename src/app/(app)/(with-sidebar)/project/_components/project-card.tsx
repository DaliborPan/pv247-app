import { RichTextEditor } from '@/components/base/rich-text-editor';
import { DetailCard } from '@/components/detail-card';
import { type GetMineProjectLoaderResult } from '@/modules/project/loader';

export const ProjectCard = ({
  project
}: {
  project: NonNullable<GetMineProjectLoaderResult>;
}) =>
  project.description ? (
    <DetailCard title="Description">
      <RichTextEditor value={project.description} disabled />
    </DetailCard>
  ) : null;
