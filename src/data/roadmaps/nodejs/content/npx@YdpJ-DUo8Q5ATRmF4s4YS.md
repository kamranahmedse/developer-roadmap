# npx

npx is a very powerful command that's been available in npm starting version 5.2, released in July 2017. If you don't want to install npm, you can install npx as a standalone package. npx lets you run code built with Node.js and published through the npm registry, without needing to install the package itself. This is particularly useful for trying out new tools, running one-time commands, or using packages in shared environments where global installations are undesirable. npx takes care of downloading the package on-the-fly, running the desired command, and then cleaning up the temporary installation. This keeps your project's dependencies lean and avoids version conflicts.

Visit the following resources to learn more:

- [@official@npx](https://docs.npmjs.com/cli/commands/npx/)
- [@article@Introduction to the npx Node.js Package Runner](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
