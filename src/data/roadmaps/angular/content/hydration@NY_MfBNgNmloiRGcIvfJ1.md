# Hydration

Hydration is the process that restores the server-side rendered application on the client. This includes things like reusing the server rendered DOM structures, persisting the application state, transferring application data that was retrieved already by the server, and other processes. Hydration can be enabled for server-side rendered (SSR) applications only. You can enable hydration manually by visiting your main application component or module and importing `provideClientHydration` from `@angular/platform-browser`.

Visit the following resources to learn more:

- [@official@Angular Official Docs - Hydration](https://angular.dev/guide/hydration)
- [@official@Angular Official Docs - provideClientHydration](https://angular.dev/api/platform-browser/provideClientHydration)
- [@article@Angular Hydration](https://www.bacancytechnology.com/blog/angular-hydration)
- [@video@Angular SSR Deep Dive (With Client HYDRATION)](https://www.youtube.com/watch?v=U1MP4uCuUVI)