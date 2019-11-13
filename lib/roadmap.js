import roadmaps from "storage/roadmaps";

export const getRequestedRoadmap = req => {
  // Considering it a new roadmap URL e.g. `/roadmaps/frontend`
  const currentUrl = req.url.replace(/\/$/, '');
  // Get the roadmap version out of the URL e.g. `/roadmaps/frontend/2019`
  const [foundVersion = ''] = currentUrl.match(/(\d+|latest)$/) || ['latest'];
  const foundVersionRegex = new RegExp(`\/?${foundVersion}$`);
  // Remove version from the URL because urls in roadmaps list don't have versions
  const urlWithoutVersion = currentUrl.replace(foundVersionRegex, '');

  const urlToSlugList = [
    currentUrl,
    urlWithoutVersion,
  ];

  const foundRoadmap = roadmaps.find(roadmap => urlToSlugList.includes(roadmap.url));
  if (!foundRoadmap) {
    return null;
  }

  return {
    ...foundRoadmap,
    version: foundVersion,
    picture: (foundRoadmap.picture || '').replace('{version}', foundVersion),
  };
};
