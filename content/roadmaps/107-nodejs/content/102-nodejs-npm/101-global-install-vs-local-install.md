# Global Install vs Local Install

NodeJS and NPM allows two methods of installing dependecies/packages: Local and Global.

## Local Install
This is mostly used when adding a package or dependency to be used as part of a specific project you're working on.
The package would be installed (with its dependencies) in `node_modules` folder **under your project**.
In addition, in `package.json` file there will be a new line added for the installed dependency under label `dependencies`.
At this point - you can start using the package in your NodeJS code by importing the package

For example: Installing `axios` package
To install a package locally (and save it):
```
$ npm install --save axios
```

## Global Install
Unlike the local install, you can install packages and dependencies **globally**.
This would install it in a system path and these packages would be available to any program which runs on **this specific** computer.
This method is often used for installing command line tools (for example, even `npm` program is a Globally installed npm package).

To install a package globally add the `-g` to the install command:
```
npm install -g <package_name>
```
