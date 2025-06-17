## Advanced concepts

JavaScript's strict mode makes you follow strict rules **(best practices)** when writing code. It prevents common mistakes JavaScript often ignores, such as undeclared variables, and keeps your code safe. Add the string `"use strict";` at the top of the JavaScript file or function to enable strict mode.

```javascript
// Without strict mode

courseNo = "200";

console.log(courseNo); // 200

// With strict mode

"use strict";  // top of your JS file

courseNo= "200";

console.log(courseNo); // courseNo is not defined i.e, you didn't create it using the var, const, or let keywords. 


// Strict mode: Functions

function strictExample() { 

"use strict"; 

courseNumber = "200"; //  Error: courseNumber is not defined

console.log(courseNumber ); // code won't run

} 

strictExample(); // ReferenceError 