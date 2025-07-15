The spread operator (`...`) allows you to merge objects through a function call or directly combine objects. Below is an example using a function call:

```javascript
function mergeObj(firstObj, secondObj) {
        return {...firstObj, ...secondObj} // merge both objects
}

let firstObj = { name: "cess", city: "Lagos"};

let secondObj = {occupation: "developer", countriesVisited: 2};

let newObj = mergeObj(firstObj, secondObj);

console.log(newObj); // {name: 'cess', city: 'Lagos', occupation: 'developer', countriesVisited: 2}
``` 