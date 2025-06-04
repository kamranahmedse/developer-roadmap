Hoisting is when a variable or function declaration gets moved to the top of its scope before the code runs. It means you can use a variable or function before you create (declare) it.

```javascript
console.log(hoistedVariable); // undefined

var hoistedVariable = "initialized var hoistedVariable";

console.log(hoistedVariable); // correct value
```

In the example above, I used the variable **"hoistedVariable"** in the first console.log before creating it. Often, this would cause an error, but due to hoisting, it will show **"undefined."** The computer will move the variable creation var hoistedVariable to the top, but won't move the variable value. When I assign the value to the variable, the second console.log will show the correct answer.

![JavaScript interview questions: Hoisting](https://assets.roadmap.sh/guest/hoisting-in-javascript-7nbhj.png)

The **"let"** and **"const"** keywords don't work well with hoisting. Even though they're moved to the top of their scope, they don't get a value right away. It creates a **"temporal dead zone"** where you can't access the variables until they're declared (created). If you try to use **"let"** or **"const"** variables before declaring them, you'll get a "ReferenceError." 