# Npm workspaces

Workspaces is a generic term that refers to the set of features in the npm cli that provides support to managing multiple packages from your local file system from within a singular top-level, root package.

This set of features makes up for a much more streamlined workflow handling linked packages from the local file system. Automating the linking process as part of npm install and avoiding manually having to use npm link in order to add references to packages that should be symlinked into the current node_modules folder.

We also refer to these packages being auto-symlinked during npm install as a single workspace, meaning it's a nested package within the current local file system that is explicitly defined in the package.json workspaces configuration.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='blue' badgeText='Read' href='https://ruanmartinelli.com/posts/npm-7-workspaces-1'>Getting Started with Npm Workspaces </BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://docs.npmjs.com/cli/v8/using-npm/workspaces'>Official | Npm Workspaces</BadgeLink>
<BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=LJaLwlS0mj4'>npm workspaces and overrides</BadgeLink>
<BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=e9ABjLAi27Q'>npm workspaces</BadgeLink>
