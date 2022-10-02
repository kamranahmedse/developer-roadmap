# Creating packages

A package is a file or directory that is described by a package.json file. A package must contain a package.json file in order to be published to the npm registry. For more information on creating a package.json file, see "Creating a package.json file".

 1. To create a package.json file, on the command line, in the root directory of your Node.js module, run npm init:
    For scoped modules, run npm init --scope=@scope-name
    For unscoped modules, run npm init
 2. Provide responses for the required fields (name and version), as well as the main field:
    name: The name of your module.
    version: The initial module version. We recommend following semantic versioning guidelines and starting with 1.0.0.

 <ResourceGroupTitle>Free Content</ResourceGroupTitle>
 <BadgeLink colorScheme='blue' badgeText='Read' href='https://medium.com/medialesson/create-your-own-npm-package-private-or-public-60edc2c42f68'>Public and Private packages</BadgeLink>
 <BadgeLink colorScheme='yellow' badgeText='Read' href='https://docs.npmjs.com/creating-node-js-modules'>Official | Creating packages</BadgeLink>
 <BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=J4b_T-qH3BY'>Create and Publish your first packages</BadgeLink>
 <BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=4zzbNac6f6Q'>Create Packages </BadgeLink>   