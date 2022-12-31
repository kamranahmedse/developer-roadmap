# Global Install vs Local Install

NodeJS and NPM allow two methods of installing dependencies/packages: Local and Global. This is mainly used when adding a package or dependency as part of a specific project you're working on. The package would be installed (with its dependencies) in `node_modules` folder **under your project**. In addition, in `package.json` file there will be a new line added for the installed dependency under the label `dependencies`. At this point - you can start using the package in your NodeJS code by importing the package. Unlike the local install, you can install packages and dependencies **globally**. This would install it in a system path, and these packages would be available to any program which runs on **this specific** computer. This method is often used for installing command line tools (for example, even `npm` program is a Globally installed npm package).

{% resources %}
  {% Official "https://docs.npmjs.com/downloading-and-installing-packages-locally", "Downloading and installing packages locally" %}
  {% Official "https://docs.npmjs.com/downloading-and-installing-packages-globally", "Downloading and installing packages globally" %}
  {% Blog "https://docs.npmjs.com/cli/v8/commands/npm-install", "NPM Install Docs" %}
  {% Blog "https://www.geeksforgeeks.org/what-is-global-installation-of-dependencies-in-node-js/", "What is global installation of dependencies in Node.js ?" %}
{% endresources %}