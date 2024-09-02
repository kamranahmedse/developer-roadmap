# Multiple Locales

To deploy an Angular application with multiple locales, follow these steps:

1. Place different versions of your app in locale-specific directories
2. Use the HTML `<base>` tag with the `href` attribute to set the base URL for relative links.
3. Deploy each language version in a different subdirectory. Redirect users to their preferred language based on the `Accept-Language` HTTP header.

Visit the following resources to learn more:

- [@official@Angular Official Docs - Deploy Multiple Locales](https://angular.dev/guide/i18n/deploy)
- [@video@How Make Multi-Language Angular Websites - Full Guidance On Angular Localization](https://www.youtube.com/watch?v=vSwYuyH4kMA)