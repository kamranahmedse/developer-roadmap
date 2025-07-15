Adding methods to an object allows you to keep your code organized and easy to reuse. One way to make this happen is by assigning a function to the object's property:

```javascript
var obj = {
        name: "Cess",
        work: "developer",
        countryVisits: 3
};

// assigning a function to the object's property

obj.newMethod = function() {
  console.log("Hello, I'm " + this.name + " and I work as a " + this.work );
};

obj.newMethod(); // Hello, I'm Cess and I work as a developer
``` 