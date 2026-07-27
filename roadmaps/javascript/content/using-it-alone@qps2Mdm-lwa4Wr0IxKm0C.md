# using it alone
 
When `this` is used outside any function, it refers to the global object. In a browser, that is `window`. In Node.js at the top level of a module, `this` refers to `module.exports`. This usage is rarely needed in application code.