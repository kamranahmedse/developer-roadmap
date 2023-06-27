# Connectivity Status

Connectivity refers to the mechanisms that allow data transfer between your React Native app and external resources through various means of communication. It is essential to ensure efficient communication with APIs, servers, and external systems, to update your app's data, fetching content or enabling real-time interactions.

## Networking Types

-**Fetch API**: The Fetch API is a native JavaScript way to make HTTP requests that can be used in React Native. It provides a simple interface for fetching resources and returns a Promise that resolves to the response of the request.

   Example:

   ```js
   fetch('https://api.example.com/data')
     .then((response) => response.json())
     .then((data) => console.log(data))
     .catch((error) => console.error(error));
   ```

- **XMLHttpRequest**: React Native has built-in support for XMLHttpRequest, which is a popular choice for communication with APIs. It can deal with various data types, like XML, JSON, or even binary data.

   Example:

   ```js
   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function () {
     if (xhr.readyState === 4 && xhr.status === 200) {
       console.log(xhr.responseText);
     }
   };
   xhr.open('GET', 'https://api.example.com/data', true);
   xhr.send();
   ```

- **WebSockets**: WebSockets allow you to establish real-time communication between your React Native app and a server. It provides a two-way communication mechanism over a single, long-held TCP connection, enabling real-time data transfer.

   Example:

   ```js
   const webSocket = new WebSocket('wss://example.com/ws');

   webSocket.onopen = () => {
     webSocket.send('Hello from React Native app!');
   };

   webSocket.onmessage = (event) => {
     console.log('Message from the server:', event.data);
   };

   webSocket.onerror = (error) => {
     console.error('WebSocket error:', error);
   };

   webSocket.onclose = (event) => {
     console.log('WebSocket connection closed:', event.code, event.reason);
   };
   ```

## Libraries for Networking

In addition to the built-in networking types, you can use external libraries to simplify networking tasks, such as:

- **Axios**: Axios is a promise-based HTTP client for the browser and Node.js environment. It supports various features like intercepting requests and responses, timeouts, and handling retries.

   Example:

   ```js
   import axios from 'axios';

   axios
     .get('https://api.example.com/data')
     .then((response) => console.log(response.data))
     .catch((error) => console.error(error));
   ```

- **Apollo Client**: Apollo Client is a comprehensive GraphQL client that helps you manage your data in a better and more efficient way, making it easier to build powerful and scalable applications.

   Example:

   ```js
   import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

   const client = new ApolloClient({
     uri: 'https://api.example.com/graphql',
     cache: new InMemoryCache(),
   });

   client
     .query({
       query: gql`
         query GetData {
           data {
             id
             name
           }
         }
       `,
     })
     .then((result) => console.log(result))
     .catch((error) => console.error(error));
   ```

By understanding these options, you can choose the most appropriate connectivity method for your React Native app, and efficiently communicate with APIs, servers, and external systems.