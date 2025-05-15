The rest parameter allows you to represent many arguments in an array. It's useful when you need a function to accept extra arguments beyond what you've listed. 

![JavaScript interview questions: rest parameter](https://assets.roadmap.sh/guest/javascript-rest-parameter-lbzht.png)

The "rest parameter" syntax consists of three dots (`...`) followed by the name of a parameter. Also, if you're using a rest parameter with other values, make sure it's the last one on the list.

```javascript
function functionName(...restParameter) {
    // Body of the function
}

// Example 2

function functionName(value1, value2, ...restParameter) {
    // Body of the function
}
``` 