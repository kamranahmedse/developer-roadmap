# Lazy loading

Lazy loading is a technique in Angular that allows you to load JavaScript components asynchronously when a specific route is activated. It improves the speed of the application load time by splitting the application into several bundles. When the user navigates through the app, the bundles are loaded as required.

Lazy loading is a strategy to identify resources as non-blocking (non-critical) and load these only when needed

Usually, Angular will load all components while starting the application (page). As you can see, all the declarations and imports are in app.module.ts file. This file will load all imported components and injected providers during the first page load.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://angular.io/guide/lazy-loading-ngmodules'>What is Lazy loading ? - Angular.io </BadgeLink>
<BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=JjIQq9lh-Bw'>Angular Tutorial - Lazy Loading</BadgeLink>
