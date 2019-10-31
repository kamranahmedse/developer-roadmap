import roadmaps from "../data/roadmaps";

export const getRequestedRoadmap = req => {
  // Considering it a new roadmap URL e.g. `/roadmaps/frontend`
  const currentUrl = req.url.replace(/\/$/, '');
  // Considering it a legacy URL e.g. converting `/frontend` to `roadmap.sh/roadmaps/frontend`
  const legacyUrl = `/roadmaps${currentUrl}`;
  // Get the roadmap version out of the URL e.g. `/roadmaps/frontend/2019`
  const [foundVersion = ''] = currentUrl.match(/(\d+|latest)$/) || ['latest'];
  const foundVersionRegex = new RegExp(`\/?${foundVersion}$`);
  // Remove version from the URL because slugs in roadmaps list don't have versions
  const newUrlWithoutVersion = currentUrl.replace(foundVersionRegex, '');
  const legacyUrlWithoutVersion = legacyUrl.replace(foundVersionRegex, '');

  const urlToSlugList = [
    currentUrl,
    legacyUrl,
    newUrlWithoutVersion,
    legacyUrlWithoutVersion,
  ];

  const foundRoadmap = roadmaps.find(roadmap => urlToSlugList.includes(roadmap.slug));
  if (!foundRoadmap) {
    return null;
  }

  return {
    ...foundRoadmap,
    version: foundVersion,
    picture: (foundRoadmap.picture || '').replace('{version}', foundVersion),
  };
};