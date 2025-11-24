// export const getProjectsCached = (() => {
//   const tags = ['getProjectsCached'];

import { projectRepository } from './repository';

//   const handler = () => unstable_cache(getProjects, tags, { tags })();
//   handler.revalidate = () => revalidateTag(tags[0]);

//   return handler;
// })();
export const getProjectsCached = projectRepository.getMany;
