Immediately invoked function expressions, or IIFEs, run as soon as they're created. It creates a local scope for variables so they don't mess with other parts of the code. You make an IIFE by placing your code inside the parentheses (). Also, adding another set of parentheses () at the function's end will make it run immediately.

```javascript
// Syntax

(function () {
        // write your code here
}());

// Example

(function () {
  console.log(
    "roadmap.sh helps prepare for  JavaScript job interview questions"
  );
})(); 