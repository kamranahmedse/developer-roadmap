import guides from "data/guides";
import authors from "data/authors";
import siteConfig from "data/site";


export const getRequestedGuide = req => {
  const guide = guides.find(guide => guide.url === req.url);
  if (!guide) {
    return null;
  }

  // We will use this URL format to find the relevant markdown
  // file inside the `/data` directory. For example `/guides/learn-regex`
  // has to have `/guides/learn-regex.md` file inside the `data` directory
  const path = guide.url.replace(/^\//, '');

  try {
    return {
      ...guide,
      author: authors.find(author => author.username === guide.author) || {},
      component: require(`../data/${path}.md`).default,
    };
  } catch (e) {
    console.log(e);
  }

  return null;
};

export const getContributionUrl = (guide) => {
  return `${siteConfig.repoUrl}${siteConfig.dataUrl}${guide.url}.md`
};
