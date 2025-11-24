Destructuring lets you take out values from arrays or objects and put them into separate variables. It makes your code easier to read and reduces mistakes when writing code. You don't have to deal with extra variables; what you assign to each variable is obvious.

```
// list of languages

let pLang = ["Java", "JavaScript", "Python"]

// using destructuring to take out each language into separate variable:

let [pLang1, pLang2, pLang3] = pLang;

console.log(pLang1); // Java

console.log(pLang2); // JavaScript

console.log(pLang3); // Python
``` 