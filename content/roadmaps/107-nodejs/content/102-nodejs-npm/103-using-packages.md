# Using packages

Every package you want to use would be exposing various APIs.
After reading about these APIs in the [npm site](https://www.npmjs.com/), and after you [installed the package in your project](101-global-install-vs-local-install.md) you can start using the package.

Usually, in your JavaScript (or TypeScript) file - you'd first import it, at the top of the file.
Then, you'd call the methods/API of this package.

For example - when using `express` package:

```javascript
import * as express from "express";
...
this.app = express();
```

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
