import guides from "data/guides";

export const getRequestedGuide = req => {
  const guide = guides.find(guide => guide.slug === req.url);
  if (!guide) {
    return null;
  }

  // Remove any slashes from the beginning
  //   Webpack module resolver takes care of the base path
  //   Look at `config.resolve.modules` in next.config.js
  // Remove `.md` from the end
  //   We need to put that in `require` below to make
  //   webpack bundle all the markdown files
  const path = guide.path.replace(/^\//, '').replace(/\.md$/, '');

  try {
    return {
      ...guide,
      component: require(`../${path}.md`).default,
      // component: require(guide.path.replace(/^\//, '')).default
    };
  } catch (e) {
    console.log(e);
  }

  return null;
};
