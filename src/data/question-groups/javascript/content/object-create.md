To create a new object using `Object.create()` method, here's an example that demonstrates it in action

```javascript
// Create a parent object 

let myDetails = { 
    newDetails: function () {
        console.log(
            `Hello, I'm ${this.name} and I have traveled to ${this.visits} countries`
        );
} 
}; 

// Create a new object using Object.create() with myDetails as prototype

let runDetails = Object.create(myDetails); 


// Add properties to the new object

runDetails.name = "Cess"; 

runDetails.visits = 2; 

// Using inheritance method

runDetails.newDetails(); // Hello, I'm Cess and I have traveled to 2 countries
``` 