# Networking

React Native provides the ability to make network requests and manage data fetched from remote sources. Networking can be accomplished through the following techniques:

## Fetch

The `fetch` function is a top-level API to make HTTP requests. It is a promise-based API for handling network requests. It allows you to fetch resources (typically JSON data) from a provided URL. 

### Fetch Example

```jsx
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

## Axios

Axios is a popular and widely-used library for making HTTP requests in javascript applications. It's promise-based and provides a simple-to-use API.