import { getProjects } from './repository';

// export const getProjectsCached = (() => {
//   const tags = ['getProjectsCached'];

//   const handler = () => unstable_cache(getProjects, tags, { tags })();
//   handler.revalidate = () => revalidateTag(tags[0]);

//   return handler;
// })();
export const getProjectsCached = getProjects;
