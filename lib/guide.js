import guides from "data/guides";
import authors from "data/authors";
import siteConfig from "data/site";

export const getRequestedGuide = req => {
  const guide = guides.find(guide => guide.url === req.url);
  if (!guide) {
    return null;
  }

  try {
    return {
      ...guide,
      author: authors.find(author => author.username === guide.author) || {},
    };
  } catch (e) {
    console.log(e);
  }

  return null;
};

export const getContributionUrl = (guide) => {
  return `${siteConfig.url.repoData}${guide.url}.md`
};
