## Advanced concepts

Using "import" and "export" makes sharing code among many files easier. The "export" keyword shares code and data like variables, classes, and functions. On the other hand, the "import" keyword brings in these values, so you can use them in a different file.

For example, you have two files called `function.js` and another file called `app.js`. `app.js` contains the original code you want to move to function.js using import and export.

You'll need to create an HTML page and link it to `function.js` instead of `app.js`. This is because `app.js` contains the original code but cannot run on its own. Also, make sure to add function.js to the HTML with the type attribute set to **"module"** to prevent errors from occurring.

```html
<!-- Link to HTML with type="module" attribute -->

<script type="module" src="function.js"></script>
```

```javascript
// Export the function in file 1 "app.js"

export function studyJs(course) {
  return `Read the JavaScript guide on, ${course}`;
}


// In file 2 the "js import" statement brings the "studyJs" function from "app.js" to "function.js"

import { studyJs } from './app.js';

console.log(studyJs("roadmap.sh")); // Read the JavaScript guide on, roadmap.sh 