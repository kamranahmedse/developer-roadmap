import roadmaps from "storage/roadmaps";

export const getRequestedRoadmap = req => {
  const normalizedUrl = req.url.replace(/\/$/, '');
  const foundRoadmap = roadmaps.find(roadmap => normalizedUrl.startsWith(roadmap.url));
  if (!foundRoadmap) {
    return null;
  }

  const roadmapPages = Object.values(foundRoadmap.sidebar || {})
    .reduce((acc, menuPages) => {
      return [
        ...acc,
        ...menuPages
      ]
    }, []);

  const foundPage = roadmapPages.find(page => page.url === normalizedUrl) || {};
  return {
    ...foundRoadmap,
    // Use the current page data or that of the found roadmap i.e. show the summary
    page: {
      title: foundPage.title || foundRoadmap.title,
      url: foundPage.url || foundRoadmap.url,
      path: foundPage.path || foundRoadmap.path
    },
  };
};
