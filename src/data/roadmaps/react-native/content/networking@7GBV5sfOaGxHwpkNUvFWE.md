# Networking

React Native facilitates network requests and data management from remote sources through various techniques. The primary method is the `fetch` function, a promise-based API that allows developers to make HTTP requests and retrieve resources, typically in JSON format, from a specified URL. For example, a simple fetch request can be made as follows:

```jsx
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

Another popular option is Axios, a widely-used library that simplifies HTTP requests in JavaScript applications. Like fetch, Axios is promise-based and offers a user-friendly API, making it a preferred choice for many developers when handling network requests in React Native.

Visit the following resources to learn more:

- [@official@Networking](https://reactnative.dev/docs/network)
- [@official@Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [@official@Axios](https://axios-http.com/docs/intro)
- [@article@Managing network connection status in React Native](https://blog.logrocket.com/managing-network-connection-status-in-react-native/)