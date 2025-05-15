A recursive function is a function that calls itself to solve a particular problem. It breaks down a big problem into smaller parts with each call and solves them one by one. The function has two main parts: the base case, which stops the repetition, and the recursive case, which repeats the steps until it reaches the base.

```javascript
function myArray(arrOld) {

// Base case: empty array 

if (arrOld.length === 0) {
        return 0;
    }
    else {
        // Recursive case: Add the first element + sum of the rest arrays
                return arrOld[0] + myArray(arrOld.slice(1));
        }
}

let newArray = [20, 30, 40, 50]; 

console.log(myArray(newArray)); // 140
``` 