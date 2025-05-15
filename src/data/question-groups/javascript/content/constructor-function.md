A constructor function creates multiple objects with the same properties and methods. Using the "new" keyword with a constructor function creates a new object and sets "this" to that object.

It's usually a good idea, but not required, to start the name of a constructor function with a capital letter. Doing this helps differentiate constructor functions from your regular functions and variables.

```javascript
function myDetails(name, visits) {
  this.name = name; // Set the name parameter to the object
  this.visits = visits; // Set the visits parameter to the object



  this.newDetails = function () {
    console.log(
      `Hi, I'm ${this.name} and I have visited ${this.visits} countries.`
    );
  };
}

// Create objects using the constructor 

let runDetails = new myDetails("Cess", 2);;

runDetails.newDetails(); // Hi, I'm Cess and I have visited 2 countries.
``` 