# Request–Response Flow

In Laravel, the request-response flow begins when a user sends a request to the application. This request first hits the `public/index.php` file, which bootstraps the Laravel framework. The request is then passed to the HTTP kernel, which identifies the appropriate route based on the request URI. The route then calls a controller action or closure, which processes the request and generates a response. Finally, the response is sent back to the user's browser.

Visit the following resources to learn more:

- [@official@Request Lifecycle](https://laravel.com/docs/lifecycle)
- [@article@Understanding the Laravel Request/Response Lifecycle: A Simple Guide for Developers](https://chandankshaw.medium.com/understanding-the-laravel-request-response-lifecycle-a-simple-guide-for-developers-e6afdf887a6d)
- [@article@Requests and Responses](https://www.fastcomet.com/tutorials/laravel/requests-and-responses)