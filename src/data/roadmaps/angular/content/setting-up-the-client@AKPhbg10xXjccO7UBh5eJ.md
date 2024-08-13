# Setting Up the Client

Before you can use `HttpClient` in your app, you must configure it using dependency injection. `HttpClient` is provided using the `provideHttpClient` helper function, which most apps include in the application providers in `app.config.ts`. If your app is using NgModule-based bootstrap instead, you can include `provideHttpClient` in the providers of your app's `NgModule`.

Visit the following resources to learn more:

- [@official@Angular Official Docs - Setting up HttpClient](https://angular.dev/guide/http/setup)
- [@video@Setting up HttpClient in Angular (NgModule)](https://www.youtube.com/watch?v=hBFtim1vO3M)