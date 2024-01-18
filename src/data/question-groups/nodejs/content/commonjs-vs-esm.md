CommonJS and ES Modules are two different module systems in JavaScript. CommonJS is the module system used in Node.js, while ES Modules are the module system used in browsers and TypeScript.

## CommonJS

```js
const fs = require('fs');
```

CommonJS modules are loaded synchronously. This means that the module is loaded and evaluated before the code using the module is executed. It uses `require()` to load modules and `module.exports` to export modules.

## ES Modules

```js
import fs from 'fs';
```

ES Modules are loaded asynchronously. This means that the module is loaded and evaluated when the module is used. It uses `import` to load modules and `export` to export modules.
