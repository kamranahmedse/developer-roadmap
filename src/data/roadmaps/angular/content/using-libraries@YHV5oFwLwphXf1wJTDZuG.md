# Using Libraries

Libraries are published as `npm packages`, usually together with schematics that integrate them with the Angular CLI. To integrate reusable library code into an application, you need to install the package and import the provided functionality in the location you use it. For most published Angular libraries, use the `ng add <lib_name>` Angular CLI command. A published library typically provides a `README` file or other documentation on how to add that library to your application. A library is able to be updated by the publisher, and also has individual dependencies which need to be kept current. To check for updates to your installed libraries, use the `ng update` Angular CLI command.

Visit the following resources to learn more:

- [@official@Using Libraries](https://angular.dev/tools/libraries/using-libraries)
- [@official@npm](https://www.npmjs.com/)