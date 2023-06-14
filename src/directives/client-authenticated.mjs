export default async (load, opts) => {
  const isAuthenticated = document.cookie.toString().indexOf('__roadmapsh_jt__') !== -1;
  if (isAuthenticated) {
    console.log("loading");

    const hydrate = await load();
    await hydrate();
  }
};
