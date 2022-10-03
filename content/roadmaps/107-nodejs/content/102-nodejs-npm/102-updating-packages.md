# Updating packages

When installing a (local) package, a new record would be created in the `package.json` file under `"dependencies"` or `"devDependencies"`, instructing whoever uses this project that you need this specific **version** of this specific package. (e.g. `"axios": "0.27.2"`).

As new feautres are added to packages and bugs are fixed, often you'd want or need to update the packages you're using. In order to do so - just edit `package.json` and update the package version you want.
After updating, don't forget to get the new version of packages by running `npm install`.

When updating, please note the potential changes based on how much the version has changed - i.e. it's possible that Major upgrades to the package would cause incomatibility in various used APIs which could break your code.
Read more about Semantic Versioning [here](https://semver.org/#summary).

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://docs.npmjs.com/cli/v8/commands/npm-install'>NPM Install Docs</BadgeLink>
