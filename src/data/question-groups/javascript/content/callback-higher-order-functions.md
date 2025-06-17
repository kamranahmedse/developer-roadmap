A callback function is a function that one function gives to another as an argument **(value)**. The second function then runs the callback function after it finishes its operation. Callbacks are often used with other functions to handle tasks like making API calls.

In the example below, the sendMessage function is a callback function because it's given **(passed)** to the sendNow function to run the code later.

```javascript
function sendMessage(message) {
  console.log("Message: " + message);
}

function sendNow(callback, message) {
  callback(message);
}
sendNow(sendMessage, "Hello, I'm learning JavaScript!"); // Message: Hello, I'm learning JavaScript!
```

Just like callbacks, higher-order functions also work with other functions. It takes another function as an argument or returns a function as a result. They're often used to handle tasks like controlling asynchronous operations.

```javascript
function createMessage(prefix) {
  return function (message) { // returns a new function
    console.log(prefix + " " + message);
  };
}

const sendMessage = createMessage("Hello"); // creates a new function

sendMessage("Cess!"); // Hello, Cess!
``` 