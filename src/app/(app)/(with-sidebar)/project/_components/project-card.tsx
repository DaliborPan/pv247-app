import { RichTextEditor } from '@/components/base/rich-text-editor';
import { DetailCard } from '@/components/detail-card';
import { getMineProjectLoader } from '@/modules/session-user/server';

export const ProjectCard = async () => {
  const project = await getMineProjectLoader();

  if (!project?.description) {
    return null;
  }

  return (
    <DetailCard title="Description">
      <RichTextEditor value={project.description} disabled />
    </DetailCard>
  );
};
