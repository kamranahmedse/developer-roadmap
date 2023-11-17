/**
 * @type {import('astro').ClientDirective}
 */
export default async (load, opts) => {
  const isAuthenticated =
    document.cookie.toString().indexOf('__roadmapsh_jt__') !== -1;
  if (isAuthenticated) {
    const hydrate = await load();
    await hydrate();
  }
};
