# HTTP Methods

PHP allows for handling HTTP methods, which are a way of defining the action to be performed on the resource identified by a given URL. In PHP, the $_SERVER superglobal array can be used to identify the HTTP method of a specific request, typically a GET, POST, PUT, DELETE or HEAD. For example, to identify if a request is a POST request, you can use `if ($_SERVER['REQUEST_METHOD'] == 'POST') { // your code here }`. More advanced handling can be done by utilizing built-in PHP libraries or third-party packages.

Visit the following resources to learn more:

- [@official@HTTP Methods](https://www.php.net/manual/en/reserved.variables.server.php)