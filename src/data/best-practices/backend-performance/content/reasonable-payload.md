# Enforcing Reasonable Payload Size Limits

Backend performance in web applications largely depends on how quickly servers are able to process, store, and retrieve data. When large data payloads are transferred, it places a heavy strain on network resources and the server itself; potentially resulting in sluggish response times and poor application performance. Hence, enforcing reasonable payload size limits is vital to maintain optimum performance. For example, a web application dealing with large image files can implement limits to ensure that users don't upload images beyond a certain size. This not only helps to keep server and bandwidth costs manageable, but also ensures that the application runs smoothly for all users.

Visit the following resources to learn more:

- [@website@Expressjs - Fast, unopinionated, minimalist web framework for Node.js](https://expressjs.com/en/resources/middleware/body-parser.html)
- [@website@Nginx - HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server](https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size)