# Fetch

*Fetch* is a JavaScript function available in React Native that is used to make network requests, similar to XMLHttpRequest in web applications. It allows you to handle requests and retrieve data from APIs or other sources. The Fetch API is built on Promises, making it simple to handle success and error cases.

## Usage

Here's a basic example demonstrating how to use fetch to make a GET request:

```javascript
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

In this example, we are using `fetch()` to make a GET request to a sample API. The function `fetch()` returns a Promise that resolves to the Response object representing the response to the request. Using `then()`, we manage the response and extract the JSON data from it. If an error occurs, we catch it with `catch()`.

## POST Request

To make a POST request using fetch, you need to provide an additional object with the `method`, `headers`, and `body` properties:

```javascript
fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'New Task',
    completed: false
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

In this example, we are making a POST request to add a new task to the sample API. The `method` property is set to 'POST', and `headers` define the content type as 'application/json'. The `body` property contains the new task in JSON format, which needs to be converted to a string using `JSON.stringify()`. Just like the GET request, we handle the response and catch any errors that occur.