import guides from "data/guides";

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
      component: require(`../data/${path}.md`).default,
      // component: require(guide.path.replace(/^\//, '')).default
    };
  } catch (e) {
    console.log(e);
  }

  return null;
};
