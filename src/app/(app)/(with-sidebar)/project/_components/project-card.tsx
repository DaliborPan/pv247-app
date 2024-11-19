import { RichTextEditor } from '@/components/base/rich-text-editor';
import { DetailCard } from '@/components/detail-card';
import { getMineProject } from '@/modules/session-user';

export const ProjectCard = async () => {
  const project = await getMineProject();

  if (!project?.description) {
    return null;
  }

  return (
    <DetailCard title="Description">
      <RichTextEditor value={project.description} disabled />
    </DetailCard>
  );
};
