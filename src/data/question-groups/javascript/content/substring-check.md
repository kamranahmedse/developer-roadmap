You can use different methods like `search()` or `indexOf()` to see if a string has a particular word. But I'll use the includes() method to check if a string contains a specific substring. It'll return "true" if the substring is present in the string and "false" if not.

```javascript
function findSubstring(mainString, substring) {
  return mainString.includes(substring);
}

console.log(findSubstring("Learn JavaScript", "JavaScript")); // True - It contains JavaScript

console.log(findSubstring("Learn JavaScript", "Python")); // False - It doesn't contain Python
``` 