There are several ways to clear an array in JavaScript. However, I'll focus on the three most common methods.

```javascript
// Setting the length of an array property to 0:

let num = [20, 30, 40, 50];

num.length = 0;

console.log(num); // []

// Using the splice() method:

let num = [20, 30, 40, 50];

num.splice(0, num.length);

console.log(num); // []

// Assigning an empty array:

let num = [20, 30, 40, 50]; 

num = []; 

console.log(num); // []
``` 