# Translation Files

After you prepare a component for translation, use the `extract-i18n` Angular CLI command to extract the marked text in the component into a source language file. The marked text includes text marked with `i18n`, attributes marked with `i18n`-attribute, and text tagged with `$localize`. The `extract-i18n` command creates a source language file named `messages.xlf` in the root directory of your project.  If you have multiple language files, add the locale to the file name, like `messages.{locale}.xlf`.

Visit the following resources to learn more:

- [@official@Angular Official Docs - Translation Files](https://angular.dev/guide/i18n/translation-files)
- [@official@Angular Official Docs - Extract i18n](https://angular.dev/cli/extract-i18n)
- [@article@Angular i18n: internationalization & localization with examples](https://lokalise.com/blog/angular-i18n/)