# Error States

Error states in Next.js routing refer to how your application handles situations where a route cannot be successfully loaded or rendered. Errors can be divided into two categories: expected errors and uncaught exceptions.

Expected errors are those that can occur during the normal operation of the application, such as those from server-side form validation or failed requests. These errors should be handled explicitly and returned to the client.

Uncaught exceptions are unexpected errors that indicate bugs or issues that should not occur during the normal flow of your application. These should be handled by throwing errors, which will then be caught by error boundaries.

Visit the following resources to learn more:

- [@official@Error Handling](https://nextjs.org/docs/app/getting-started/error-handling#handling-expected-errors)
- [@video@Next.js 15 Tutorial - Error Handling](https://www.youtube.com/watch?v=fWV5WPSbgdg)