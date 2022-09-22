# Commonjs

CommonJS modules are the original way to package JavaScript code for Node.js. Node.js also supports the ESModules standard used by browsers and other JavaScript runtimes, but CJS is still widely used in backend Node.js applications. Sometimes these modules will be written with a .cjs extension.

CJS imports using a syntax with a `require` statement. eg. `const circle = require('./circle.js');`

CJS exports using the syntax `exports.` inside the module. eg.

```
// contents of circle.js
const { PI } = Math.PI;

exports.area = (r) => PI * r ** 2;

exports.circumference = (r) => 2 * PI * r;
```

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.freecodecamp.org/news/modules-in-javascript/#commonjsmodules'>Modules in Javascript: CJS Section</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://nodejs.org/api/modules'>Node.js documentation for CJS modules</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/'>How the CJS Module System Works</BadgeLink>
<BadgeLink colorScheme='purple' badgeText='Watch' href='https://www.youtube.com/watch?v=XTND4rjATXA'>How to Import and Export Modules in CJS</BadgeLink>